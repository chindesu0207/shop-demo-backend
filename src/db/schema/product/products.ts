import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { pgTable, text, uuid, boolean, timestamp, integer } from "drizzle-orm/pg-core";

export const products = pgTable("products", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: text("name").notNull(),
  originalPrice: integer("original_price").notNull(),
  imageUrl: text("image_url").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export type InsertProduct = InferInsertModel<typeof products>;
export type SelectProduct = InferSelectModel<typeof products>;
