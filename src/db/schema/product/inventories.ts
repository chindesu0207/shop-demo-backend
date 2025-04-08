import { pgTable, uuid, text, integer } from "drizzle-orm/pg-core";
import { products } from "./products";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const inventories = pgTable("inventories", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  size: text("size").notNull(),
  color: text("color").notNull(),
  stock: integer("stock").default(0).notNull(),
});

export type InsertInventories = InferInsertModel<typeof inventories>;
export type SelectInventories = InferSelectModel<typeof inventories>;
