import { db } from "../db";
import { promotions } from "../db/schema";
// import { ProductRepo } from "../repos/product.repo";

export const getPromotions = async () => {
  return db.select().from(promotions);
};
