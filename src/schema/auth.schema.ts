import z from 'zod';

import { DOB_REGEX, GENDER_ARRAY, PASSWORD_REGEX, PHONE_REGEX } from '@/constants';

export const passwordSchema = z
  .string()
  .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
  .max(25, 'Mật khẩu phải có tối đa 25 ký tự')
  .regex(PASSWORD_REGEX, 'Mật khẩu phải bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt');

export const registerSchema = z.object({
  fullName: z
    .string()
    .min(10, 'Họ và tên phải có ít nhất 10 ký tự')
    .max(100, 'Họ và tên không được vượt quá 100 ký tự'),
  email: z.string().email('Địa chỉ email không hợp lệ'),
  password: passwordSchema,
  dob: z.string().regex(DOB_REGEX, {
    message: 'Ngày sinh phải có định dạng dd-MM-yyyy.',
  }),
  phone: z.string().regex(PHONE_REGEX, { message: 'Số điện thoại không hợp lệ.' }),
  address: z
    .string()
    .min(3, { message: 'Địa chỉ phải có ít nhất 3 ký tự.' })
    .max(100, { message: 'Địa chỉ không được vượt quá 100 ký tự.' }),
  gender: z.enum([...GENDER_ARRAY] as [string, ...string[]], {
    errorMap: () => ({
      message: 'Giới tính phải là một trong các giá trị: MALE, FEMALE, OTHER.',
    }),
  }),
});

export type RegisterFormValues = z.infer<typeof registerSchema>;
