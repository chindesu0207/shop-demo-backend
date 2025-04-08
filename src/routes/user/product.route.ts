import { Router } from "express";
import { getProductDetail, getProductList } from "../../controllers/user/product.controller";
import { getPromotionList } from "../../controllers/user/promotion.controller";

const router = Router();

router.get("/", getProductList);
router.get("/promotion", getPromotionList);
router.get("/detail/:productId", getProductDetail);

export default router;
