import { pgTable, uuid, integer } from "drizzle-orm/pg-core";
import { products } from "./products";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";

export const priceOptions = pgTable("price_options", {
  id: uuid("id").defaultRandom().primaryKey(),
  productId: uuid("product_id")
    .references(() => products.id)
    .notNull(),
  points: integer("points").default(0),
  extraPrice: integer("extra_price").default(0).notNull(),
});

export type InsertPriceOptions = InferInsertModel<typeof priceOptions>;
export type SelectPriceOptions = InferSelectModel<typeof priceOptions>;
