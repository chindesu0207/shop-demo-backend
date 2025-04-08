import { Request, Response } from "express";
import handleErrorAsync from "../../utils/handleErrorAsync";
import { PromotionRepo } from "../../repos/promotion.repo";
import { AppError } from "../../utils/AppError";

export const getAdminPromotionList = handleErrorAsync(async (_req: Request, res: Response) => {
  const promotions = await PromotionRepo.getAll();

  res.status(200).json({
    status: "success",
    data: promotions,
  });
});

export const createPromotion = handleErrorAsync(async (req: Request, res: Response) => {
  const { description, isActive } = req.body;
  const promotion = await PromotionRepo.create({ description, isActive });

  res.status(201).json({
    status: "success",
    message: "新增優惠成功",
    promotion,
  });
});

export const addToPromotion = handleErrorAsync(async (req: Request, res: Response) => {
  const { promotionId } = req.params;
  const { productIds } = req.body;

  const existing = await PromotionRepo.getById(promotionId);
  if (!existing) throw new AppError("查無此優惠 id", 404);

  const promotion = await PromotionRepo.updateTarget(promotionId, productIds);

  res.status(201).json({
    status: "success",
    message: "新增產品成功",
    promotion,
  });
});
