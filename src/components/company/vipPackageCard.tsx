import { ROUTE_PATH } from "@/constants"
import { IVipPackage } from "@/interface"
import { OrderFormValues } from "@/schema/order.schema"
import { useOrderService } from "@/service/order.service"
import { useMutation } from "@tanstack/react-query"
import { ArrowRight } from "lucide-react"
import { useNavigate } from "react-router-dom"

interface VipPackageCardProps {
    package: IVipPackage
    gradientColor: string
    badgeColor: string
}
//TODO: bổ sung kiểm tra nếu có gói VIP đang dùng thì hiển thị thông báo "Bạn đang sử dụng gói VIP ABC bạn có chắc chắn
// muốn mua gói này không?" trước khi tạo đơn hàng mới"
export default function VipPackageCard({ package: pkg, gradientColor, badgeColor }: VipPackageCardProps) {
    const navigate = useNavigate();
    const { createOrder } = useOrderService();

    const mutation = useMutation({
        mutationFn: (data: OrderFormValues) => createOrder(data),
        onSuccess: (response) => {
            if (response?.id) {
                navigate(ROUTE_PATH.COMPANY.ORDER.CHECKOUT.LINK(response.id));
            }
        },
    });

    const onSubmit = () => {
        mutation.mutate({ vipPackageId: pkg.id });
    };

    return (
        <div
            className={`relative h-full rounded-2xl transition-all duration-400}`}
        >
            {/* Background Gradient */}
            <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradientColor} opacity-10`} />

            {/* Border Gradient */}
            <div className={`absolute inset-0 rounded-2xl border border-gradient-to-br ${gradientColor} border-opacity-30`} />

            {/* Content */}
            <div className="relative z-10 p-6 h-full flex flex-col bg-white dark:bg-slate-900 backdrop-blur-sm rounded-2xl border border-slate-200 dark:border-slate-700">
                {/* Header */}
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                        <div className={`px-3 py-1 rounded-lg ${badgeColor} font-bold text-sm`}>{pkg.name}</div>
                        {pkg.priority >= 2 && (
                            <div className="bg-yellow-500/20 dark:bg-yellow-500/30 text-yellow-700 dark:text-yellow-300 px-2 py-1 rounded text-xs font-semibold">
                                ⭐ HOT
                            </div>
                        )}
                    </div>
                </div>

                {/* Price */}
                <div className="mb-6">
                    <div className="text-4xl font-bold text-slate-900 dark:text-white mb-1">{(pkg.price).toLocaleString('vi-VN')}</div>
                    <p className="text-slate-500 dark:text-slate-500 text-sm">VND / {pkg.durationDay} ngày</p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-6 py-4 border-y border-slate-200 dark:border-slate-700">
                    <div>
                        <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-1">Bài đăng</p>
                        <p className="text-slate-900 dark:text-white font-bold text-lg">{pkg.numPost}</p>
                    </div>
                    <div>
                        <p className="text-slate-500 dark:text-slate-500 text-xs font-medium mb-1">Thời hạn</p>
                        <p className="text-slate-900 dark:text-white font-bold text-lg">{pkg.durationDay}d</p>
                    </div>
                </div>

                {/* Features */}
                <div className="flex-1 mb-6">
                    {pkg.description && <p className="text-slate-600 dark:text-slate-400 text-sm mb-4">{pkg.description}</p>}
                </div>

                {/* CTA Button */}
                <button
                    className={`w-full py-3 px-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${pkg.priority >= 2
                        ? `bg-gradient-to-r ${gradientColor} text-white hover:shadow-lg hover:shadow-${gradientColor.split(" ")[1]}/50`
                        : "bg-slate-200 dark:bg-slate-700 text-slate-900 dark:text-slate-100 hover:bg-slate-300 dark:hover:bg-slate-600"
                        }`}
                    onClick={onSubmit}
                >
                    Chọn gói
                    <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    )
}
