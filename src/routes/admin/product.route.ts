import { Router } from "express";
import {
  createInventories,
  createPriceOption,
  createProduct,
  getAdminProductList,
} from "../../controllers/admin/product.controller";
import {
  addToPromotion,
  createPromotion,
  getAdminPromotionList,
} from "../../controllers/admin/promotion.controller";
import { validate } from "../../middlewares/validate.middleware";
import { createProductSchema } from "../../validations/product.schema";
import { addToPromotionSchema, createPromotionSchema } from "../../validations/promotion.schema";
import { createPriceOptionSchema } from "../../validations/priceOption.schema";

const router = Router();
router.get("/", getAdminProductList);
router.post("/", validate(createProductSchema, "body"), createProduct);

router.get("/promotion", getAdminPromotionList);
router.post("/promotion", validate(createPromotionSchema, "body"), createPromotion);
router.put("/promotion/:promotionId", validate(addToPromotionSchema, "body"), addToPromotion);
router.post("/price", validate(createPriceOptionSchema, "body"), createPriceOption);

router.post("/:productId", createInventories);

export default router;
