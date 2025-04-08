import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, uuid, text, boolean } from "drizzle-orm/pg-core";

export const promotions = pgTable("promotions", {
  id: uuid("id").defaultRandom().primaryKey(),
  description: text("description").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  targetProductIds: uuid("product_id").array().default([]).notNull(),
});

export type InsertPromotion = InferInsertModel<typeof promotions>;
export type SelectPromotion = InferSelectModel<typeof promotions>;
