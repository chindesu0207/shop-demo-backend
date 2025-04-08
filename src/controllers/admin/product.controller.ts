import { Request, Response } from "express";
import handleErrorAsync from "../../utils/handleErrorAsync";
import { ProductRepo } from "../../repos/product.repo";
import { InventoryRepo } from "../../repos/inventory.repo";
import { omitFields } from "../../utils/omitField";
import { SelectInventories } from "../../db/schema";
import { priceOptionRepo } from "../../repos/priceOption.repo";

export const getAdminProductList = handleErrorAsync(async (_req: Request, res: Response) => {
  const products = await ProductRepo.getAll();
  res.status(200).json({
    status: "success",
    data: products,
  });
});

export const createProduct = handleErrorAsync(async (req: Request, res: Response) => {
  const { name, originalPrice, imageUrl, isActive } = req.body;
  const product = await ProductRepo.create({ name, originalPrice, imageUrl, isActive });

  res.status(201).json({
    status: "success",
    message: "商品新增成功",
    product,
  });
});

export const createPriceOption = handleErrorAsync(async (req: Request, res: Response) => {
  const { productId, points, extraPrice } = req.body;

  const priceOption = await priceOptionRepo.create({
    productId,
    points,
    extraPrice,
  });

  res.status(201).json({
    status: "success",
    message: "價格新增成功",
    priceOption,
  });
});

export const createInventories = handleErrorAsync(async (req: Request, res: Response) => {
  const { productId } = req.params;
  const { data } = req.body;

  const result: Omit<SelectInventories, "productId">[] = [];
  const failItems = [];
  let errorNum: number = 0;

  for (const item of data) {
    try {
      const created = await InventoryRepo.create(productId, item);
      const filtered = omitFields(created, ["productId"]);
      result.push(filtered);
    } catch {
      errorNum++;
      failItems.push(item);
    }
  }

  const message =
    errorNum > 0
      ? `成功新增 ${result.length} 筆，失敗 ${errorNum} 筆`
      : `成功新增 ${result.length} 筆`;

  res.status(201).json({
    status: "success",
    message: message,
    successCount: result.length,
    result,
    failItems: failItems,
  });
});
