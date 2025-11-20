import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import { ICompanyVipPackage, IResponse } from '@/interface';
import { OrderFormValues } from '@/schema/order.schema';

export const useOrderService = () => {
  const getOrderById = async (id: string) => {
    const res: IResponse<ICompanyVipPackage> = await axiosClient.get(END_POINT.COMPANY.ORDER.GET_BY_ID(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const createOrder = async (data: OrderFormValues) => {
    const res: IResponse<ICompanyVipPackage> = await axiosClient.post(END_POINT.COMPANY.ORDER.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const changeStatusFailed = async (id: string) => {
    const res: IResponse<ICompanyVipPackage> = await axiosClient.patch(
      END_POINT.COMPANY.ORDER.CHANGE_STATUS_FAILED(id),
    );
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  return {
    getOrderById,
    createOrder,
    changeStatusFailed,
  };
};
