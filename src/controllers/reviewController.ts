import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { ReviewService } from "../services/reviewService";

const reviewService = new ReviewService();

export class ReviewController extends BaseController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId, rating, content } = req.body;

      // TODO: 나중에 userId는 JWT에서 꺼내서 쓰게 변경
      if (!userId || !bookId || !rating || !content) {
        return this.error(res, 400, "userId, bookId, rating, content는 필수입니다.");
      }

      const review = await reviewService.createReview({
        userId: Number(userId),
        bookId: Number(bookId),
        rating: Number(rating),
        content,
      });

      this.success(res, review);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const review = await reviewService.getReviewById(id);
      if (!review) {
        return this.error(res, 404, "리뷰를 찾을 수 없습니다.");
      }
      this.success(res, review);
    } catch (err) {
      next(err);
    }
  };

  getList = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { bookId, userId } = req.query;

      const reviews = await reviewService.getReviews({
        bookId: bookId ? Number(bookId) : undefined,
        userId: userId ? Number(userId) : undefined,
      });

      this.success(res, reviews);
    } catch (err) {
      next(err);
    }
  };

  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { rating, content } = req.body;

      const review = await reviewService.updateReview(id, {
        rating: rating ? Number(rating) : undefined,
        content,
      });

      this.success(res, review);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await reviewService.deleteReview(id);
      this.success(res, { id });
    } catch (err) {
      next(err);
    }
  };
}
