import { LOCAL_STORAGE_KEY } from "@/constants";
import { useOrderService } from "@/service/order.service";
import { getLocalStorage, removeLocalStorage, setLocalStorage } from "@/utils";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

interface PaymentTimerProps {
    totalTime?: number;
    onTimeout?: () => void;
}
//TODO: xử lý khi dù chuyển trang thì khi time out vẫn tự động chuyển trạng thái thành FAILED
const PaymentTimer = ({ totalTime = 60, onTimeout }: PaymentTimerProps) => {
    const { changeStatusFailed } = useOrderService();
    const { id } = useParams();
    const changeStatusMutation = useMutation({
        mutationFn: () => changeStatusFailed(id!),
    });

    const [secondsLeft, setSecondsLeft] = useState(() => {
        const storedExpire = getLocalStorage(LOCAL_STORAGE_KEY.PAYMENT_EXPIRE_TIME);

        if (storedExpire) {
            const expireTime = Number(storedExpire);
            const diff = Math.floor((expireTime - Date.now()) / 1000);

            return diff > 0 ? diff : 0;
        }

        const expireTime = Date.now() + totalTime * 1000;

        setLocalStorage(LOCAL_STORAGE_KEY.PAYMENT_EXPIRE_TIME, String(expireTime));

        return totalTime;
    });
    const WARNING_TIME = useMemo(() => Math.floor(totalTime * 0.2), [totalTime]);

    useEffect(() => {
        if (secondsLeft <= 0) {
            removeLocalStorage(LOCAL_STORAGE_KEY.PAYMENT_EXPIRE_TIME);
            changeStatusMutation.mutate();
            onTimeout?.();

            return;
        }
        const t = setInterval(() => setSecondsLeft((s) => s - 1), 1000);

        return () => clearInterval(t);
    }, [secondsLeft]);

    const percent = (secondsLeft / totalTime) * 100;
    const minutes = Math.floor(secondsLeft / 60);
    const seconds = secondsLeft % 60;

    const getProgressBarColor = () => {
        if (secondsLeft <= WARNING_TIME) {
            return "bg-gradient-to-r from-red-500 to-red-600";
        }

        return "bg-gradient-to-r from-cyan-500 to-emerald-500";
    };

    return (
        <div className="w-full">
            <div className="flex items-center justify-between mb-1">
                <span className={`text-sm ${secondsLeft <= WARNING_TIME ? 'text-red-500 font-medium' : 'text-gray-600 dark:text-gray-300'}`}>
                    Thời gian còn lại
                </span>
                <span className={`text-sm font-medium ${secondsLeft <= WARNING_TIME ? 'text-red-500' : ''}`}>
                    {minutes}:{String(seconds).padStart(2, "0")}
                </span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden dark:bg-gray-700">
                <div
                    className={`h-full transition-all duration-300 ${getProgressBarColor()}`}
                    style={{ width: `${percent}%` }}
                />
            </div>
            {secondsLeft <= WARNING_TIME && secondsLeft > 0 && (
                <p className="text-sm text-red-500 mt-2 animate-pulse">
                    Sắp hết thời gian thanh toán!
                </p>
            )}
            {secondsLeft <= 0 && (
                <p className="text-sm text-red-500 mt-2">
                    Hết thời gian thanh toán.
                </p>
            )}
        </div>
    );
};

export default PaymentTimer;