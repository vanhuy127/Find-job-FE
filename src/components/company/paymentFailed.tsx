import { ROUTE_PATH } from "@/constants";
import { XCircleIcon } from "lucide-react";
import { Link } from "react-router-dom";

export default function PaymentFailed() {
    return (
        <div className="min-h-[400px] flex items-center justify-center">
            <div className="max-w-md w-full mx-auto p-8 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center">
                <XCircleIcon className="w-20 h-20 mx-auto text-red-500 mb-4" />
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                    Thanh toán thất bại
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                    Rất tiếc, giao dịch không thành công. Vui lòng thử lại hoặc liên hệ với chúng tôi nếu cần hỗ trợ.
                </p>
                <div className="space-y-3">
                    <Link
                        to={ROUTE_PATH.COMPANY.VIP_PACKAGE.LIST}
                        className="block w-full py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                    >
                        Quay lại
                    </Link>
                </div>
            </div>
        </div>
    );
}