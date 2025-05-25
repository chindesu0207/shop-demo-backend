import { Request, Response } from "express";
import handleErrorAsync from "../../utils/handleErrorAsync";
import { omitFields } from "../../utils/omitField";
import { ProductRepo } from "../../repos/product.repo";
import { PromotionRepo } from "../../repos/promotion.repo";
import { priceOptionRepo } from "../../repos/priceOption.repo";
import { InventoryRepo } from "../../repos/inventory.repo";

export const getProductList = handleErrorAsync(async (_req: Request, res: Response) => {
  const products = await ProductRepo.getAll();
  const filtered = products.map((item) => omitFields(item, ["isActive", "createdAt", "updatedAt"]));
  res.status(200).json({
    status: "success",
    data: filtered,
  });
});

export const getProductDetail = handleErrorAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;

  const product = await ProductRepo.getById(productId);
  const inventories = await InventoryRepo.getByProductId(productId);
  const promotions = await PromotionRepo.getByProductId(productId);
  const priceOptions = await priceOptionRepo.getByProductId(productId);

  const filteredProduct = omitFields(product, ["isActive", "createdAt", "updatedAt"]);
  const filteredInventories = inventories.map((item) => omitFields(item, ["productId"]));
  const filteredPriceOptions = priceOptions.map((item) => omitFields(item, ["productId"]));

  res.status(200).json({
    status: "success",
    data: {
      product: filteredProduct,
      styles: filteredInventories,
      promotions,
      priceOptions: filteredPriceOptions,
    },
  });
});

export const getProduct = handleErrorAsync(async (req: Request, res: Response) => {
  const { styleId } = req.params;

  const inventory = await InventoryRepo.getById(styleId);
  const product = await ProductRepo.getById(inventory.productId);

  const filteredInventory = omitFields(inventory, ["productId"]);
  const filteredProduct = omitFields(product, ["isActive", "createdAt", "updatedAt"]);

  res.status(200).json({
    status: "success",
    data: {
      product: filteredProduct,
      styles: filteredInventory,
    },
  });
});
