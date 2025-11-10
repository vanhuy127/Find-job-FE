import { z } from 'zod';

export const orderSchema = z.object({
  vipPackageId: z.string().uuid('ID gói VIP không hợp lệ'),
});
export type OrderFormValues = z.infer<typeof orderSchema>;
