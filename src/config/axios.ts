import axios, { AxiosError, AxiosInstance, AxiosResponse, CreateAxiosDefaults } from 'axios';
import { toast } from 'sonner';

import { END_POINT, LOCAL_STORAGE_KEY, SYSTEM_ERROR } from '@/constants';
import { IResponse } from '@/interface';
import { getLocalStorage, removeLocalStorage, setLocalStorage } from '@/utils';

import { envConfig } from './env';

let refreshTokenPromise: Promise<void> | null = null;

const createAxiosInstance = (
  baseURL: string,
  configs: CreateAxiosDefaults = {
    timeout: 15000,
    timeoutErrorMessage: SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE,
    withCredentials: true,
  },
): AxiosInstance => {
  const instance = axios.create({ baseURL, ...configs });

  // Request Interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      // Disable cache
      config.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate';
      config.headers['Pragma'] = 'no-cache';
      config.headers['Expires'] = '0';

      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  // Response Interceptor
  instance.interceptors.response.use(
    (response: AxiosResponse) => response.data,
    async (error: AxiosError) => {
      const originalRequest = error.config as typeof error.config & { _retry?: boolean };

      if (error.code === 'ECONNABORTED' || error.message === SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE) {
        toast.error(SYSTEM_ERROR.TIMEOUT_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      if (!error.response) {
        toast.error(SYSTEM_ERROR.NETWORK_ERROR.MESSAGE);

        return Promise.reject(error);
      }

      // ✅ Trường hợp accessToken hết hạn → gọi refresh từ cookie

      if (error.response?.status === 410 && originalRequest && !originalRequest._retry) {
        originalRequest._retry = true; // Prevent infinite loop

        if (!refreshTokenPromise) {
          refreshTokenPromise = instance
            .get(END_POINT.AUTH.REFRESH_TOKEN)
            .then((res) => {
              const { accessToken } = res.data;
              setLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN, accessToken);
            })
            .catch((_error) => {
              removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
              toast.error('Phiên đăng nhập đã hết hạn.');

              return Promise.reject(_error);
            })
            .finally(() => {
              refreshTokenPromise = null;
            });
        }
        try {
          await refreshTokenPromise;

          // Update authorization header with new token
          const newToken = getLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
          }

          // Retry original request
          return instance(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      if (error.response?.status !== 410) {
        if (error.response?.status === 401) {
          removeLocalStorage(LOCAL_STORAGE_KEY.ACCESS_TOKEN);
          toast.error('Truy cập không được phép.');

          return Promise.reject(error);
        }
        // ✅ Xử lý lỗi thông thường khác
        const { error_code } = error.response?.data as IResponse<null>;
        if (error_code) {
          const errorKey = error_code;
          toast.error(errorKey as string);
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const axiosClient = createAxiosInstance(envConfig.VITE_API_URL);

export { axiosClient };
