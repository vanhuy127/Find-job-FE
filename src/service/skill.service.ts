import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT, MESSAGE_CODE } from '@/constants';
import { IListResponse, IParamsBase, IResponse, ISkill } from '@/interface';
import { SkillFormValues } from '@/schema/skill.schema';

export const useSkillService = () => {
  const getSkills = async (params?: IParamsBase) => {
    const res: IListResponse<ISkill> = await axiosClient.get(END_POINT.ADMIN.SKILL.GET_ALL, { params });

    return res.data;
  };

  const getSkillById = async (id: string) => {
    const res: IResponse<ISkill> = await axiosClient.get(END_POINT.ADMIN.SKILL.GET_BY_ID(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      return res.data;
    }
  };

  const createSkill = async (data: SkillFormValues) => {
    const res: IResponse<ISkill> = await axiosClient.post(END_POINT.ADMIN.SKILL.CREATE, data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const editSkill = async (id: string, data: SkillFormValues) => {
    const res: IResponse<ISkill> = await axiosClient.put(END_POINT.ADMIN.SKILL.EDIT(id), data);
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  const deleteSkill = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.delete(END_POINT.ADMIN.SKILL.DELETE(id));
    if (!res.success) {
      toast.error(MESSAGE_CODE[res.error_code as keyof typeof MESSAGE_CODE]);

      return;
    } else {
      toast.success(MESSAGE_CODE[res.message_code as keyof typeof MESSAGE_CODE]);

      return res.data;
    }
  };

  return {
    getSkills,
    createSkill,
    editSkill,
    deleteSkill,
    getSkillById,
  };
};
