import z from 'zod';

import { RESUME_STATUS_ARRAY } from '@/constants';

export const resumeStatusSchema = z.object({
  status: z.enum([...RESUME_STATUS_ARRAY] as [string, ...string[]], {
    errorMap: () => ({ message: 'Trạng thái không hợp lệ' }),
  }),
});

export type ResumeStatusFormValues = z.infer<typeof resumeStatusSchema>;

export const uploadResumeSchema = z.object({
  file: z
    .instanceof(File, { message: 'Vui lòng tải lên file' })
    .refine(
      (file) =>
        file.type === 'application/pdf' ||
        file.type === 'application/msword' ||
        file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'Chỉ cho phép file PDF, DOC hoặc DOCX',
    )
    .refine((file) => file.size <= 5 * 1024 * 1024, 'Kích thước file phải nhỏ hơn 5MB'),
  coverLetter: z
    .string()
    .min(3, 'Cover letter phải có ít nhất 3 ký tự')
    .max(1000, 'Cover letter phải nhỏ hơn 1000 ký tự'),
});

export type uploadResumeFormValues = z.infer<typeof uploadResumeSchema>;
