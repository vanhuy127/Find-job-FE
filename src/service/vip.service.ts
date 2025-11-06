import { toast } from 'sonner';

import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IParamsBase, IResponse, IVipPackage } from '@/interface';
import { SkillFormValues } from '@/schema/skill.schema';

export const useVipPackageService = () => {
  const getVipPackages = async (params?: IParamsBase & { priority?: string }) => {
    const res: IListResponse<IVipPackage> = await axiosClient.get(END_POINT.ADMIN.VIP_PACKAGE.GET_ALL, { params });

    return res.data;
  };

  const getVipPackageById = async (id: string) => {
    const res: IResponse<IVipPackage> = await axiosClient.get(END_POINT.ADMIN.VIP_PACKAGE.GET_BY_ID(id));
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      return res.data;
    }
  };

  const createVipPackage = async (data: SkillFormValues) => {
    const res: IResponse<IVipPackage> = await axiosClient.post(END_POINT.ADMIN.VIP_PACKAGE.CREATE, data);
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  const editVipPackage = async (id: string, data: SkillFormValues) => {
    const res: IResponse<IVipPackage> = await axiosClient.put(END_POINT.ADMIN.VIP_PACKAGE.EDIT(id), data);
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  const deleteVipPackage = async (id: string) => {
    const res: IResponse<boolean> = await axiosClient.delete(END_POINT.ADMIN.VIP_PACKAGE.DELETE(id));
    if (!res.success) {
      toast.error(res.error_code);

      return;
    } else {
      toast.success(res.message_code);

      return res.data;
    }
  };

  return {
    getVipPackages,
    getVipPackageById,
    createVipPackage,
    editVipPackage,
    deleteVipPackage,
  };
};
