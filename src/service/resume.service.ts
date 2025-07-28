import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IParamsBase, IResponse, IResumeExtend } from '@/interface';
import { ResumeStatusFormValues } from '@/schema/resume.scheme';

export const useResumeService = () => {
  const getResumes = async (params?: IParamsBase & { status?: string }) => {
    const res: IListResponse<IResumeExtend> = await axiosClient.get(END_POINT.COMPANY.RESUMES.LIST, { params });

    return res.data;
  };

  const getResumeById = async (id: string) => {
    const res: IResponse<IResumeExtend> = await axiosClient.get(END_POINT.COMPANY.RESUMES.GET_BY_ID(id));

    return res.data;
  };

  const changeStatus = async (id: string, data: ResumeStatusFormValues) => {
    const res: IResponse<boolean> = await axiosClient.patch(END_POINT.COMPANY.RESUMES.CHANGE_STATUS(id), data);
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  return {
    getResumes,
    getResumeById,
    changeStatus,
  };
};
