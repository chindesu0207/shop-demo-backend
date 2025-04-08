import { z } from "zod";

export const promotionSchema = z.object({
  id: z.string().uuid(),
  description: z.string().min(1, "優惠內容不得為空"),
  isActive: z.boolean().default(true),
  targetProductIds: z.array(z.string().uuid()),
});

export const createPromotionSchema = promotionSchema.pick({
  description: true,
  isActive: true,
});

export const addToPromotionSchema = z.object({
  productIds: z.array(z.string().uuid()).min(1, "至少需要新增一筆商品"),
});

export type CreatePromotionInput = z.infer<typeof createPromotionSchema>;
