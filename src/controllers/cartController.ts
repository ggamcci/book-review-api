import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { CartService } from "../services/cartService";

const cartService = new CartService();

export class CartController extends BaseController {
  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId, quantity } = req.body;

      if (!userId || !bookId) {
        return this.error(res, 400, "userId, bookId는 필수입니다.");
      }

      const q = quantity ? Number(quantity) : 1;

      const item = await cartService.addToCart({
        userId: Number(userId),
        bookId: Number(bookId),
        quantity: q,
      });

      this.success(res, item);
    } catch (err) {
      next(err);
    }
  };

  listByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const list = await cartService.getCartByUser(userId);

      this.success(res, list);
    } catch (err) {
      next(err);
    }
  };

  updateQuantity = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { quantity } = req.body;

      if (!quantity) return this.error(res, 400, "quantity는 필수입니다.");

      const item = await cartService.updateQuantity(id, Number(quantity));

      this.success(res, item);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      await cartService.remove(id);

      this.success(res, { id });
    } catch (err) {
      next(err);
    }
  };
}
