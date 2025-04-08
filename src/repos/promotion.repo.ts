import { eq, sql } from "drizzle-orm";
import { db } from "../db";
import { InsertPromotion, promotions, SelectPromotion } from "../db/schema";

export const PromotionRepo = {
  getAll: async () => {
    return db.select().from(promotions);
  },
  getById: async (id: string) => {
    const result = await db.select().from(promotions).where(eq(promotions.id, id));
    return result[0] ?? null;
  },
  getByProductId: async (id: string) => {
    const result = await db
      .select({ id: promotions.id, description: promotions.description })
      .from(promotions)
      .where(sql`${id} = ANY (${promotions.targetProductIds})` && eq(promotions.isActive, true));
    return result;
  },
  create: async ({
    description,
    isActive,
  }: InsertPromotion): Promise<Omit<SelectPromotion, "targetProductIds">> => {
    const result = await db.insert(promotions).values({ description, isActive }).returning({
      id: promotions.id,
      description: promotions.description,
      isActive: promotions.isActive,
    });
    return result[0];
  },
  updateTarget: async (id: string, targetProductIds: string[]): Promise<SelectPromotion> => {
    //去除重複的內容
    const current = (await PromotionRepo.getById(id)).targetProductIds;
    const merged = Array.from(new Set([...current, ...targetProductIds]));

    const result = await db
      .update(promotions)
      .set({ targetProductIds: merged })
      .where(eq(promotions.id, id))
      .returning();
    return result[0];
  },
};
