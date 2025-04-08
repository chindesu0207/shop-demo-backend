import { Router } from "express";
import { loginUser, registerUser } from "../controllers/auth.controller";
import { validate } from "../middlewares/validate.middleware";
import { loginUserSchema, registerUserSchema } from "../validations/auth.schema";

const router = Router();

router.post("/register", validate(registerUserSchema, "body"), registerUser);
router.post("/login", validate(loginUserSchema, "body"), loginUser);

export default router;
