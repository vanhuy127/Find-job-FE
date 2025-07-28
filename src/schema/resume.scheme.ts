import z from 'zod';

import { RESUME_STATUS_ARRAY } from '@/constants';

export const resumeStatusSchema = z.object({
  status: z.enum([...RESUME_STATUS_ARRAY] as [string, ...string[]], {
    errorMap: () => ({ message: 'Trạng thái không hợp lệ' }),
  }),
});

export type ResumeStatusFormValues = z.infer<typeof resumeStatusSchema>;
