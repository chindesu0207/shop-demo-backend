import { eq } from "drizzle-orm";
import { db } from "../db";
import { InsertInventories, inventories, SelectInventories } from "../db/schema";

export const InventoryRepo = {
  create: async (productId: string, data: InsertInventories): Promise<SelectInventories> => {
    const result = await db
      .insert(inventories)
      .values({ ...data, productId })
      .returning();
    return result[0];
  },
  getByProductId: async (id: string) => {
    const result = await db.select().from(inventories).where(eq(inventories.productId, id));
    return result;
  },
};
