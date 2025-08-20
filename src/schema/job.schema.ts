import z from 'zod';

import { DOB_REGEX, JOB_LEVEL_ARRAY, JOB_TYPE_ARRAY } from '@/constants';

export const jobSchema = z
  .object({
    title: z.string().min(3, 'Tiêu đề phải có ít nhất 3 ký tự'),
    description: z.string().min(10, 'Mô tả công việc phải có ít nhất 10 ký tự'),
    address: z.string().min(3, 'Địa chỉ phải có ít nhất 3 ký tự'),
    province: z.string().min(2, 'Vui lòng nhập tỉnh/thành phố'),
    jobType: z.enum([...JOB_TYPE_ARRAY] as [string, ...string[]], {
      errorMap: () => ({ message: 'Loại công việc không hợp lệ' }),
    }),
    level: z.enum([...JOB_LEVEL_ARRAY] as [string, ...string[]], {
      errorMap: () => ({ message: 'Cấp bậc không hợp lệ' }),
    }),
    numApplications: z
      .number({ invalid_type_error: 'Số lượng ứng tuyển phải là số' })
      .min(1, 'Số lượng ứng tuyển phải lớn hơn hoặc bằng 1'),
    salaryMin: z
      .number({ invalid_type_error: 'Lương tối thiểu phải là số' })
      .min(1000, 'Lương tối thiểu phải lớn hơn hoặc bằng 1.000 đ'),
    salaryMax: z
      .number({ invalid_type_error: 'Lương tối đa phải là số' })
      .min(1000, 'Lương tối đa phải lớn hơn hoặc bằng 1.000 đ'),
    endDate: z.string().regex(DOB_REGEX, 'Hạn ứng tuyển phải có định dạng dd-MM-yyyy'),
    skills: z.array(z.string()).nonempty('Vui lòng chọn ít nhất 1 kỹ năng'),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: 'Lương tối đa phải lớn hơn hoặc bằng lương tối thiểu',
    path: ['salaryMax'],
  });

export type JobFormValues = z.infer<typeof jobSchema>;
