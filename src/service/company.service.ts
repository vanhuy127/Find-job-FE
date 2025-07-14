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

  return {
    getCompanies,
    getCompanyById,
  };
};
