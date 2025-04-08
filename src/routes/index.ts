import { Router } from "express";
import auth from "../middlewares/auth.middleware";
import authRouter from "./auth.route";
import productRouter from "./user/product.route";
import adminProductRouter from "./admin/product.route";

const router = Router();

router.use("/auth", authRouter);
router.use("/products", productRouter);

router.use("/admin/products", auth, adminProductRouter);

export default router;
