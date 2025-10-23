import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, LOCAL_STORAGE_KEY } from '@/constants';
import { IResponse, IUserAccount } from '@/interface';
import { RegisterFormValues } from '@/schema/auth.schema';
import { useAuthStore } from '@/store';
import { removeLocalStorage, setLocalStorage } from '@/utils';

export const useAuthService = () => {
  const { setUser } = useAuthStore();

  const register = async (data: RegisterFormValues) => {
    const res: IResponse<null> = await axiosClient.post(END_POINT.AUTH.REGISTER, {
      ...data,
    });
    if (res.success) {
      toast.success('Đăng ký tài khoản thành công');
    }
  };

  const login = async (email: string, password: string) => {
    const res = await axiosClient.post(END_POINT.AUTH.LOGIN, { email, password });
    if (res.data) {
      const { accessToken, id, email, role } = res.data;
      setUser({ id, email, role });
      setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
      toast.success('Login success');
    }
  };

  const logout = async () => {
    const res: IResponse<null> = await axiosClient.get(END_POINT.AUTH.LOGOUT);

    if (res && res.success) {
      removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
      setUser(null);
      toast.success('Logout success');
    }
  };

  const getMe = async () => {
    const result: IResponse<IUserAccount> = await axiosClient.get(END_POINT.AUTH.ME, {
      headers: {
        'Cache-Control': 'no-cache',
      },
    });
    if (result.success && result.data) {
      setUser(result.data);
    }
  };

  const lockAccount = async (accountId: string) => {
    const res: IResponse<null> = await axiosClient.patch(`${END_POINT.AUTH.LOCK}`, { id: accountId });
    if (res.success) {
      toast.success('Khóa tài khoản thành công');
    }
  };

  const unlockAccount = async (accountId: string) => {
    const res: IResponse<null> = await axiosClient.patch(`${END_POINT.AUTH.UNLOCK}`, { id: accountId });
    if (res.success) {
      toast.success('Mở khóa tài khoản thành công');
    }
  };

  const changePassword = async (password: string, newPassword: string) => {
    const res = await axiosClient.patch(END_POINT.AUTH.CHANGE_PASSWORD, { password, newPassword });
    if (res.data) {
      toast.success('Cập nhật mật khẩu thành công');
    }
  };

  const sendEmailForgotPassword = async (email: string) => {
    const res = await axiosClient.patch(END_POINT.AUTH.FORGOT_PASSWORD, { email });
    if (res.data) {
      toast.success('Gửi email thành công');
    }
  };

  const checkAvailableToken = async (token: string) => {
    const res: IResponse<null> = await axiosClient.get(END_POINT.AUTH.CHECK_AVAILABLE_TOKEN(token));

    return res.success;
  };

  const resetPassword = async (token: string, newPassword: string) => {
    const res = await axiosClient.patch(END_POINT.AUTH.RESET_PASSWORD, { token, newPassword });
    if (res.data) {
      toast.success('Token hợp lệ');
    }
  };

  return {
    register,
    login,
    getMe,
    logout,
    lockAccount,
    unlockAccount,
    changePassword,
    sendEmailForgotPassword,
    checkAvailableToken,
    resetPassword,
  };
};
