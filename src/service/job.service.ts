import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IJob, IListResponse, IParamsBase, IResponse } from '@/interface';
import { JobFormValues } from '@/schema/job.schema';

export const useJobService = () => {
  const getJobs = async (params?: IParamsBase & { province?: string; jobType?: string; level?: string }) => {
    const res: IListResponse<IJob> = await axiosClient.get(END_POINT.ADMIN.JOBS.LIST, { params });

    return res.data;
  };

  const getJobsForUser = async (
    params?: IParamsBase & {
      province?: string;
      jobType?: string;
      level?: string;
      minSalary?: string;
      maxSalary?: string;
      skills?: string[];
    },
  ) => {
    const res: IListResponse<IJob> = await axiosClient.get(END_POINT.USER.JOBS.LIST, { params });

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

  const createJob = async (data: JobFormValues) => {
    const res: IResponse<IJob> = await axiosClient.post(END_POINT.COMPANY.JOBS.CREATE, data);
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  const editJob = async (id: string, data: JobFormValues) => {
    const res: IResponse<IJob> = await axiosClient.put(END_POINT.COMPANY.JOBS.EDIT(id), data);
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  const deleteJob = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.patch(END_POINT.COMPANY.JOBS.DELETE(id));
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  return {
    getJobs,
    getJobById,
    getJobsCurrentCompany,
    createJob,
    editJob,
    deleteJob,
    getJobsForUser,
  };
};
