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

export const registerCompanySchema = z.object({
  email: z.string().email({ message: 'Email không hợp lệ.' }),
  password: z
    .string()
    .min(8, { message: 'Mật khẩu phải có ít nhất 8 ký tự.' })
    .max(25, { message: 'Mật khẩu không được vượt quá 25 ký tự.' })
    .regex(PASSWORD_REGEX, {
      message: 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt.',
    }),
  name: z
    .string()
    .min(3, { message: 'Tên công ty phải có ít nhất 3 ký tự.' })
    .max(100, { message: 'Tên công ty không được vượt quá 100 ký tự.' }),
  description: z.string().optional(),
  address: z.string().min(3, { message: 'Địa chỉ phải có ít nhất 3 ký tự.' }),
  provinceId: z
    .string({ required_error: 'Vui lòng chọn tỉnh/thành phố.' })
    .min(1, { message: 'Vui lòng chọn tỉnh/thành phố.' }),
  website: z.string().url({ message: 'Vui lòng nhập đúng định dạng URL trang web.' }).optional(),
  taxCode: z.string().min(5, { message: 'Mã số thuế phải có ít nhất 5 ký tự.' }),
  businessLicensePath: z
    .instanceof(File, { message: 'Vui lòng tải lên file giấy phép kinh doanh.' })
    .refine((file) => file.type === 'application/pdf', 'Chỉ cho phép tải lên file PDF.')
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Kích thước file phải nhỏ hơn 5MB.'),
  logo: z
    .instanceof(File, { message: 'Vui lòng tải lên logo công ty.' })
    .refine(
      (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
      'Chỉ cho phép tải lên file ảnh (JPG, JPEG, PNG).',
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Kích thước ảnh phải nhỏ hơn 5MB.'),
});

export type RegisterCompanyFormValues = z.infer<typeof registerCompanySchema>;
