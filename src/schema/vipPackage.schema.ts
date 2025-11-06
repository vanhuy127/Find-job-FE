import { z } from 'zod';

import { VIP_PACKAGE_LEVEL_ARRAY } from '@/constants';

export const vipPackageSchema = z.object({
  name: z.string().min(3, 'Tên gói VIP phải có ít nhất 3 ký tự'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  numPost: z.number().min(1, 'Số lượng bài viết phải lớn hơn 0'),
  price: z.number({ invalid_type_error: 'Giá phải là số' }).min(1000, 'Giá phải lớn hơn hoặc bằng 1.000 đ'),
  durationDay: z.number().min(1, 'Thời gian phải lớn hơn 0'),
  priority: z.enum([...VIP_PACKAGE_LEVEL_ARRAY] as [string, ...string[]], {
    errorMap: () => ({ message: 'Loại gói VIP không hợp lệ' }),
  }),
});
export type VipPackageFormValues = z.infer<typeof vipPackageSchema>;
