import { Code } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Badge } from './ui/badge';
import { ROUTE_PATH } from '@/constants';

const Footer = () => {

  return (
    <footer className="border-t border-gray-800 bg-gray-900 py-12 text-white transition-colors duration-300 dark:border-gray-900 dark:bg-gray-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center">
              <Code className="h-8 w-8 text-cyan-400" />
              <span className="ml-2 text-xl font-bold">Yuh<span className='text-cyan-500'>nav</span> Jobs</span>
              <Badge className="ml-2 border-cyan-500/30 bg-cyan-500/20 text-cyan-300">IT</Badge>
            </div>
            <p className="mb-4 text-gray-400">Nền tảng tuyển dụng IT hàng đầu tại Việt Nam</p>
            <div className="flex space-x-4">
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">f</span>
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">in</span>
              </div>
              <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg bg-gray-800 transition-colors hover:bg-cyan-500 dark:bg-gray-900">
                <span className="text-xs">tw</span>
              </div>
            </div>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Dành cho Developers</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to={ROUTE_PATH.USER.JOBS.LIST} className="transition-colors hover:text-cyan-400">
                  Tìm việc IT
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Dành cho Công ty</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to={ROUTE_PATH.AUTH.REGISTER_COMPANY} className="transition-colors hover:text-cyan-400">
                  Tạo tài khoản nhà tuyển dụng
                </Link>
              </li>
              <li>
                <Link to={ROUTE_PATH.COMPANY.COMPANY_STATUS} className="transition-colors hover:text-cyan-400">
                  Tra cứu trạng thái duyệt công ty
                </Link>
              </li>
              <li>
                <Link to={ROUTE_PATH.COMPANY.JOBS.CREATE} className="transition-colors hover:text-cyan-400">
                  Đăng tin tuyển dụng
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-4 text-lg font-semibold text-cyan-400">Liên hệ</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Email: huynv1207@gmail.com</li>
              <li>Hotline: +84 123 456 789</li>
              <li>Địa chỉ: Thủy Bằng, Thành Phố Huế</li>
            </ul>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-800 pt-8 text-center text-gray-400 dark:border-gray-900">
          <p>&copy; 2025 DevJobs. Made with ❤️ for Vietnamese developers.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
