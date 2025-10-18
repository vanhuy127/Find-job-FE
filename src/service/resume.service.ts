import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IParamsBase, IResponse, IResume, IResumeExtend } from '@/interface';
import { ResumeStatusFormValues } from '@/schema/resume.scheme';

export const useResumeService = () => {
  const getResumes = async (params?: IParamsBase & { status?: string }) => {
    const res: IListResponse<IResumeExtend> = await axiosClient.get(END_POINT.COMPANY.RESUMES.LIST, { params });

    return res.data;
  };

  const getResumesForUser = async (params?: IParamsBase & { status?: string }) => {
    const res: IListResponse<IResumeExtend> = await axiosClient.get(END_POINT.USER.RESUMES.LIST_USER_APPLIED, {
      params,
    });

    return res.data;
  };

  const getResumesByIdForUser = async (id: string) => {
    const res: IResponse<IResumeExtend> = await axiosClient.get(END_POINT.USER.RESUMES.GET_BY_ID(id));

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

  const uploadCV = async (data: { file: File | undefined; coverLetter: string; jobId: string }) => {
    const formData = new FormData();
    if (data.file) formData.append('file', data.file);
    formData.append('coverLetter', data.coverLetter);
    formData.append('jobId', data.jobId);

    const res: IResponse<IResume> = await axiosClient.post(END_POINT.COMPANY.RESUMES.UPLOAD_CV, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    toast.success(res.message_code);

    if (!res.success) {
      toast.error(res.error_code);
    } else {
      toast.success(res.message_code);
    }

    return res.data;
  };

  return {
    getResumes,
    getResumeById,
    changeStatus,
    uploadCV,
    getResumesForUser,
    getResumesByIdForUser,
  };
};
