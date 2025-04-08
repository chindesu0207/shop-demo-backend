import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertProduct, products, SelectProduct } from "../db/schema";

export const ProductRepo = {
  getAll: async () => {
    return db.select().from(products);
  },
  getById: async (id: string) => {
    const result = await db.select().from(products).where(eq(products.id, id));
    return result[0] ?? null;
  },
  create: async ({
    name,
    originalPrice,
    imageUrl,
    isActive,
  }: InsertProduct): Promise<Omit<SelectProduct, "updatedAt">> => {
    const result = await db
      .insert(products)
      .values({ name, originalPrice, imageUrl, isActive })
      .returning({
        id: products.id,
        name: products.name,
        originalPrice: products.originalPrice,
        imageUrl: products.imageUrl,
        isActive: products.isActive,
        createdAt: products.createdAt,
      });
    return result[0];
  },
};
