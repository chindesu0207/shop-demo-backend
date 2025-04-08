import { z } from "zod";

export const priceOptionSchema = z.object({
  id: z.string().uuid(),
  productId: z.string().uuid("商品 id 格式錯誤"),
  points: z.number().min(0, "點數不得為負數"),
  extraPrice: z.number().min(0, "價格不得為負數"),
});

export const createPriceOptionSchema = priceOptionSchema.pick({
  productId: true,
  points: true,
  extraPrice: true,
});
