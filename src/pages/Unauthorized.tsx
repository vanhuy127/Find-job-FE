import { Button } from "@/components/ui/button";
import { ROUTE_PATH } from "@/constants";
import { ShieldAlert } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen text-center px-4">
      <ShieldAlert className="w-20 h-20 text-red-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2">401 - Không có quyền truy cập</h1>
      <p className="text-muted-foreground mb-6 max-w-md">
        Bạn không có quyền truy cập vào trang này. Hãy đăng nhập với tài khoản có quyền phù hợp hoặc quay lại trang chủ.
      </p>
      <div className="flex gap-3">
        <Button variant="default" onClick={() => navigate(ROUTE_PATH.USER.HOME)}>
          Về trang chủ
        </Button>
        <Button variant="outline" onClick={() => navigate(ROUTE_PATH.AUTH.LOGIN)}>
          Đăng nhập
        </Button>
      </div>
    </div>
  );;
};
export default Unauthorized;
