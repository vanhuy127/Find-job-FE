import z from 'zod';

export const companySchema = z.object({
  description: z.string().optional(),
  address: z.string().min(3, { message: 'Địa chỉ phải có ít nhất 3 ký tự.' }),
  provinceId: z
    .string({ required_error: 'Vui lòng chọn tỉnh/thành phố.' })
    .min(1, { message: 'Vui lòng chọn tỉnh/thành phố.' }),
  website: z.string().url({ message: 'Vui lòng nhập đúng định dạng URL trang web.' }).optional(),
  logo: z
    .union([
      z
        .instanceof(File)
        .refine(
          (file) => ['image/jpeg', 'image/jpg', 'image/png'].includes(file.type),
          'Chỉ cho phép tải lên file ảnh (JPG, JPEG, PNG).',
        )
        .refine((file) => file.size <= 5 * 1024 * 1024, 'Kích thước ảnh phải nhỏ hơn 5MB.'),
      z.string().url().optional(), // Cho phép giữ logo cũ (URL)
      z.undefined(), // Cho phép không gửi logo
    ])
    .optional(),
});

export type CompanyFormValues = z.infer<typeof companySchema>;
