import { z } from "zod";

export const productSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(1, "商品名稱不得為空"),
  originalPrice: z.number().positive("價格必須為正數"),
  imageUrl: z.string().url("圖片網址請填寫正確路徑"),
  isActive: z.boolean().optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const createProductSchema = productSchema.pick({
  name: true,
  originalPrice: true,
  imageUrl: true,
  isActive: true,
});

export type CreateProductInput = z.infer<typeof createProductSchema>;
