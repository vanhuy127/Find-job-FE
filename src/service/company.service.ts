import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { ICompany, IJob, IListResponse, IParamsBase, IResponse } from '@/interface';
import { CompanyFormValues } from '@/schema/company.schema';

export const useCompanyService = () => {
  const getCompanies = async (params?: IParamsBase & { status?: number; province?: string }) => {
    const res: IListResponse<ICompany> = await axiosClient.get(END_POINT.ADMIN.COMPANIES.LIST, { params });

    return res.data;
  };

  const getCompanyCurrent = async () => {
    const res: IResponse<ICompany> = await axiosClient.get(END_POINT.COMPANY.GET_CURRENT);

    return res.data;
  };

  const updateCompanyInfoCurrent = async (data: CompanyFormValues) => {
    const formData = new FormData();
    if (data.logo) formData.append('logo', data.logo);

    formData.append('description', data.description || '');
    formData.append('address', data.address);
    formData.append('provinceId', data.provinceId);
    formData.append('website', data.website || '');

    const res: IResponse<null> = await axiosClient.patch(END_POINT.COMPANY.UPDATE_INFO, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    if (!res.success) {
      toast.error(res.error_code);
    } else {
      toast.success(res.message_code);
    }
  };

  const getCompaniesForUser = async (params?: IParamsBase & { status?: number; province?: string }) => {
    const res: IListResponse<ICompany> = await axiosClient.get(END_POINT.USER.COMPANIES.LIST, { params });

    return res.data;
  };

  const getCompanyByIdForUser = async (id: string) => {
    const res: IResponse<ICompany> = await axiosClient.get(END_POINT.USER.COMPANIES.DETAILS(id));

    return res.data;
  };

  const getJobsForCompany = async (id: string) => {
    const res: IListResponse<IJob> = await axiosClient.get(END_POINT.USER.COMPANIES.CURRENT_JOBS(id));

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

  const getCompanyStatus = async (email: string) => {
    const res: IResponse<ICompany> = await axiosClient.get(END_POINT.COMPANY.COMPANY_STATUS, {
      params: {
        email,
      },
    });

    return res.data;
  };

  return {
    getCompanies,
    getCompanyById,
    getCompanyPendingById,
    getCompaniesPending,
    changeCompanyStatus,
    getCompaniesForUser,
    getCompanyByIdForUser,
    getJobsForCompany,
    getCompanyStatus,
    updateCompanyInfoCurrent,
    getCompanyCurrent,
  };
};
