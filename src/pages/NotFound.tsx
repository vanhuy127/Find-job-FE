import { Button } from '@/components/ui/button';
import { ROUTE_PATH } from '@/constants';
import { SearchX } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen text-center px-4">
            <SearchX className="w-20 h-20 text-blue-500 mb-4" />
            <h1 className="text-4xl font-bold mb-2 text-red-600">404 - Không tìm thấy trang</h1>
            <p className="text-muted-foreground mb-6 max-w-md">
                Trang bạn đang tìm không tồn tại hoặc đã bị xóa. Hãy kiểm tra lại đường dẫn hoặc quay lại trang chủ.
            </p>
            <Button onClick={() => navigate(ROUTE_PATH.USER.HOME)} className='bg-cyan-600 hover:bg-cyan-800'>Về trang chủ</Button>
        </div>
    );
}

export default NotFound