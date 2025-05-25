import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertPriceOptions, priceOptions, SelectPriceOptions } from "../db/schema";

export const priceOptionRepo = {
  create: async ({
    productId,
    points,
    extraPrice,
  }: InsertPriceOptions): Promise<SelectPriceOptions> => {
    const result = await db
      .insert(priceOptions)
      .values({ productId, points, extraPrice })
      .returning();
    return result[0];
  },
  getById: async (id: string) => {
    const result = await db.select().from(priceOptions).where(eq(priceOptions.id, id));
    return result[0];
  },
  getByProductId: async (id: string) => {
    const result = await db.select().from(priceOptions).where(eq(priceOptions.productId, id));
    return result;
  },
};
