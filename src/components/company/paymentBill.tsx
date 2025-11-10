import { IVipPackage } from "@/interface";

export default function PaymentBill({ vipPackage: vp }: { vipPackage: IVipPackage }) {
    return (
        <div className="max-w-md mx-auto my-8 flex-1">
            <div className="p-6 border rounded-lg bg-white dark:bg-gray-800 dark:border-gray-700 shadow-md">
                {/* Header */}
                <div className="text-center border-b pb-4 mb-4">
                    <h3 className="text-xl font-bold text-gray-800 dark:text-white">
                        HÓA ĐƠN THANH TOÁN
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {new Date().toLocaleString()}
                    </p>
                </div>

                {/* Content */}
                <div className="space-y-3">
                    <div className="flex justify-between items-center py-2">
                        <span className="text-gray-600 dark:text-gray-300">Gói</span>
                        <span className="font-medium text-gray-800 dark:text-white">{vp.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-dashed">
                        <span className="text-gray-600 dark:text-gray-300">Số tiền</span>
                        <span className="font-medium text-green-600 dark:text-green-400">{(vp.price).toLocaleString("vi-VN")} VND</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-dashed">
                        <span className="text-gray-600 dark:text-gray-300">Số bài đăng</span>
                        <span className="font-medium text-gray-800 dark:text-white">{vp.numPost} bài</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-t border-dashed">
                        <span className="text-gray-600 dark:text-gray-300">Thời hạn</span>
                        <span className="font-medium text-gray-800 dark:text-white">{vp.durationDay} ngày</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
