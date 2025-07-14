import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IJob, IListResponse, IParamsBase, IResponse } from '@/interface';

export const useJobService = () => {
  const getJobs = async (params?: IParamsBase & { province?: string; jobType?: string; level?: string }) => {
    const res: IListResponse<IJob> = await axiosClient.get(END_POINT.ADMIN.JOBS.LIST, { params });

    return res.data;
  };

  const getJobsCurrentCompany = async (
    params?: IParamsBase & { province?: string; jobType?: string; level?: string },
  ) => {
    const res: IListResponse<IJob> = await axiosClient.get(END_POINT.COMPANY.JOBS.LIST_CURRENT_COMPANY, { params });

    return res.data;
  };

  const getJobById = async (id: string) => {
    const res: IResponse<IJob> = await axiosClient.get(END_POINT.ADMIN.JOBS.DETAILS(id));

    return res.data;
  };

  return {
    getJobs,
    getJobById,
    getJobsCurrentCompany,
  };
};
