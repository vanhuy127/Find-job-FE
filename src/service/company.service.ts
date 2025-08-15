import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { ICompany, IListResponse, IParamsBase, IResponse } from '@/interface';

export const useCompanyService = () => {
  const getCompanies = async (params?: IParamsBase & { status?: number; province?: string }) => {
    const res: IListResponse<ICompany> = await axiosClient.get(END_POINT.ADMIN.COMPANIES.LIST, { params });

    return res.data;
  };

  const getCompanyById = async (id: string) => {
    const res: IResponse<ICompany> = await axiosClient.get(END_POINT.ADMIN.COMPANIES.DETAILS(id));

    return res.data;
  };

  const getCompanyPendingById = async (id: string) => {
    const res: IResponse<ICompany> = await axiosClient.get(END_POINT.ADMIN.COMPANIES.DETAILS_PENDING(id));

    return res.data;
  };

  const getCompaniesPending = async (params?: IParamsBase & { province?: string; status?: string }) => {
    const res: IListResponse<ICompany> = await axiosClient.get(END_POINT.ADMIN.COMPANIES.LIST_PENDING, { params });

    return res.data;
  };

  const changeCompanyStatus = async (id: string, status: number, reasonReject: string) => {
    const res: IResponse<boolean> = await axiosClient.patch(END_POINT.ADMIN.COMPANIES.CHANGE_STATUS(id), {
      status,
      reasonReject,
    });
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  return {
    getCompanies,
    getCompanyById,
    getCompanyPendingById,
    getCompaniesPending,
    changeCompanyStatus,
  };
};
