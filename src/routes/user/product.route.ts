import { Router } from "express";
import {
  getProduct,
  getProductDetail,
  getProductList,
} from "../../controllers/user/product.controller";
import { getPromotionList } from "../../controllers/user/promotion.controller";
import { getPriceOption } from "../../controllers/user/priceOption.controller";

const router = Router();

router.get("/", getProductList);
router.get("/promotion", getPromotionList);
router.get("/priceOption/:priceOptionId", getPriceOption);
router.get("/style/:styleId", getProduct);
router.get("/detail/:productId", getProductDetail);

export default router;
