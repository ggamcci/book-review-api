import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { WishlistService } from "../services/wishlistService";

const wishlistService = new WishlistService();

export class WishlistController extends BaseController {
  add = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId } = req.body;

      if (!userId || !bookId) {
        return this.error(res, 400, "userId, bookId는 필수입니다.");
      }

      const item = await wishlistService.addToWishlist({
        userId: Number(userId),
        bookId: Number(bookId),
      });

      this.success(res, item);
    } catch (err: any) {
      // Prisma duplicate error 처리
      if (err.code === "P2002") {
        return this.error(res, 409, "이미 찜한 책입니다.");
      }
      next(err);
    }
  };

  listByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);

      const list = await wishlistService.getWishlistByUser(userId);

      this.success(res, list);
    } catch (err) {
      next(err);
    }
  };

  remove = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);

      await wishlistService.removeFromWishlist(id);

      this.success(res, { id });
    } catch (err) {
      next(err);
    }
  };
}
