import { BaseService } from "./baseServer";

export class ReviewService extends BaseService {
  async createReview(data: {
    userId: number;
    bookId: number;
    rating: number;
    content: string;
  }) {
    return this.db.review.create({ data });
  }

  async getReviewById(id: number) {
    return this.db.review.findUnique({ where: { id } });
  }

  async getReviews(params: {
    bookId?: number;
    userId?: number;
  }) {
    const { bookId, userId } = params;
    return this.db.review.findMany({
      where: {
        ...(bookId ? { bookId } : {}),
        ...(userId ? { userId } : {}),
      },
      orderBy: { createdAt: "desc" },
    });
  }

  async updateReview(id: number, data: { rating?: number; content?: string }) {
    return this.db.review.update({
      where: { id },
      data,
    });
  }

  async deleteReview(id: number) {
    return this.db.review.delete({ where: { id } });
  }
}
