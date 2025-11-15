import { useQuery } from "@tanstack/react-query";
import { Crown, Calendar, FileText } from "lucide-react";
import { useMemo } from "react";
// tuỳ vị trí thực tế
import { useVipPackageService } from "@/service/vip.service";
import { formatDate } from "@/utils";
import { DATE_PATTERN, ROUTE_PATH } from "@/constants";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const VipPackageBought = () => {
    const { getVipPackageBought } = useVipPackageService();

    const { data, isLoading, isError } = useQuery({
        queryKey: ["company-vip-bought"],
        queryFn: getVipPackageBought,
    });
    const navigate = useNavigate();

    const {
        daysTotal,
        daysLeft,
        daysPercent,
        postsPercent,
    } = useMemo(() => {
        const now = Date.now();
        const start = new Date(data?.createdAt || "").getTime();
        const end = new Date(data?.endDate || "").getTime();
        const daysTotal = Math.max(1, Math.ceil((end - start) / (1000 * 60 * 60 * 24)));
        const daysPassed = Math.max(0, Math.ceil((now - start) / (1000 * 60 * 60 * 24)));
        const daysLeft = Math.max(0, Math.ceil((end - now) / (1000 * 60 * 60 * 24)));
        const daysPercent = Math.min(100, Math.round((daysPassed / daysTotal) * 100));
        const postsPercent = Math.min(100, Math.round(((data?.vipPackage.numPost || 0) - (data?.remainingPosts || 0)) / Math.max(1, data?.vipPackage.numPost || 1) * 100));

        return { daysTotal, daysPassed, daysLeft, daysPercent, postsPercent };
    }, [data?.createdAt, data?.endDate, data?.remainingPosts, data?.vipPackage.numPost]);

    if (isLoading)
        return (
            <div className="max-w-2xl mx-auto p-6">
                <div className="animate-pulse h-40 bg-gray-100 dark:bg-gray-800 rounded-lg" />
            </div>
        );

    if (isError || !data)
        return (
            <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-gray-600 dark:text-gray-300">Bạn chưa đăng ký gói VIP nào.</p>
            </div>
        );

    return (
        <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-xl shadow-md p-6 border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-50 dark:bg-yellow-900/20 rounded-full">
                        <Crown className="text-yellow-500 w-6 h-6" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Gói VIP hiện tại</h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{data.vipPackage.name}</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-4">
                    <div className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-blue-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-200">Tên gói:</span>
                        <span className="text-gray-900 dark:text-white">{data.vipPackage.name}</span>
                    </div>

                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Calendar className="w-5 h-5 text-green-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-200">Thời hạn:</span>
                            <span className="text-gray-900 dark:text-white">
                                {formatDate(data.createdAt, DATE_PATTERN.DATE_TIME)} → {formatDate(data.endDate, DATE_PATTERN.DATE_TIME)}
                            </span>
                        </div>

                        <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                            <div
                                className={`h-2 ${daysLeft <= Math.ceil(daysTotal * 0.2) ? "bg-red-500" : "bg-emerald-400"} transition-all`}
                                style={{ width: `${daysPercent}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span>{daysLeft} ngày còn lại</span>
                            <span>{daysPercent}% đã sử dụng</span>
                        </div>
                    </div>

                    <div className="mt-2 p-3 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <strong>Mô tả:</strong> {data.vipPackage.description}
                        </p>
                        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                            <strong>Giá:</strong>{" "}
                            {data.vipPackage.price.toLocaleString("vi-VN")} VNĐ / {data.vipPackage.durationDay} ngày
                        </p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-md border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <div>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Bài đăng còn lại</p>
                                <p className="text-2xl font-bold text-gray-900 dark:text-white">{data.remainingPosts}</p>
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{data.vipPackage.numPost} tổng</div>
                        </div>

                        <div className="w-full bg-gray-100 dark:bg-gray-900/40 rounded-full h-3 overflow-hidden">
                            <div
                                className={`h-3 ${postsPercent >= 80 ? "bg-red-500" : "bg-cyan-500"} transition-all`}
                                style={{ width: `${postsPercent}%` }}
                            />
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mt-2">
                            <span>{postsPercent}% đã sử dụng</span>
                            <span>{data.vipPackage.numPost - data.remainingPosts} đã dùng</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3">
                        <Button
                            onClick={() => navigate(ROUTE_PATH.COMPANY.JOBS.CREATE)}
                            className="cursor-pointer bg-gradient-to-r from-cyan-600 to-teal-600 text-white shadow-lg hover:from-cyan-700 hover:to-teal-700"
                        >
                            Đăng tin tuyển dụng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VipPackageBought;
