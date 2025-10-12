import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

import { ROUTE_PATH } from '@/constants';
import { useAuthStore } from '@/store';

export const useCheckLogin = () => {
  const navigator = useNavigate();
  const { user } = useAuthStore();

  const checkLogin = (callback: (...args: any[]) => void) => {
    if (!user) {
      toast.error('Bạn cần phải đăng nhập để thực hiện chức năng này');
      navigator(ROUTE_PATH.AUTH.LOGIN);

      return;
    }

    callback();
  };

  const isLoggedIn = user ? true : false;

  return { checkLogin, isLoggedIn };
};
