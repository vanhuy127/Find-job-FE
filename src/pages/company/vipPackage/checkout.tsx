import PaymentBill from "@/components/company/paymentBill";
import PaymentFailed from "@/components/company/paymentFailed";
import PaymentSuccess from "@/components/company/paymentSuccess";
import PaymentTimer from "@/components/company/paymentTimer";
import { STATUS_ORDER } from "@/constants";
import { useOrderService } from "@/service/order.service";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const VipCheckout = () => {
    const [paymentStatus, setPaymentStatus] = useState<"pending" | "success" | "failed">("pending");
    const { id } = useParams();
    const { getOrderById } = useOrderService();

    const { data: order } = useQuery({
        queryKey: ['company-order', id],
        queryFn: () => getOrderById(id!),
        enabled: !!id,
        refetchInterval: (query) => {
            return query.state.data?.status === STATUS_ORDER.PENDING ? 5000 : false;
        },
    });

    const handleTimeout = () => {
        setPaymentStatus("failed");
    };

    useEffect(() => {
        if (order) {
            if (order.status === STATUS_ORDER.SUCCESS) setPaymentStatus("success");
            else if (order.status === STATUS_ORDER.FAILED) setPaymentStatus("failed");
        }
    }, [order]);

    if (paymentStatus === "success") return <PaymentSuccess />;
    if (paymentStatus === "failed") return <PaymentFailed />;

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md dark:bg-gray-900 dark:text-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Thanh Toán Gói VIP</h1>
            <PaymentTimer totalTime={300} onTimeout={handleTimeout} />
            <div className="flex items-center flex-col gap-2 md:flex-row md:gap-6">
                <div className="flex-1 flex items-center justify-center">
                    <div className="p-4 bg-gray-50 rounded-md dark:bg-gray-800 w-80 h-80 ">
                        <img src={`https://qr.sepay.vn/img?acc=${import.meta.env.VITE_BANK_ACCOUNT_NUM}&bank=${import.meta.env.VITE_BANK_ACCOUNT_NAME}&amount=${order?.vipPackage.price}&des=SEVQR+TKPH02+${order?.id}`} className="w-full h-full object-cover" alt="QR code image" />
                    </div>
                </div>
                {
                    order && (
                        <PaymentBill vipPackage={order?.vipPackage} />
                    )
                }
            </div>
        </div >
    )
}
export default VipCheckout;