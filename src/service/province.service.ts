import { axiosClient } from '@/config/axios';
import { END_POINT } from '@/constants';
import { IListResponse, IProvince } from '@/interface';

export const useProvinceService = () => {
  const getProvinces = async () => {
    const res: IListResponse<IProvince> = await axiosClient.get(END_POINT.PROVINCE.GET_ALL);

    return res.data;
  };

  return {
    getProvinces,
  };
};
