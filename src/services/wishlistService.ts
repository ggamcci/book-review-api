import { BaseService } from "./baseService";

export class WishlistService extends BaseService {
  async addToWishlist(data: { userId: number; bookId: number }) {
    return this.db.wishlist.create({ data });
  }

  async getWishlistByUser(userId: number) {
    return this.db.wishlist.findMany({
      where: { userId },
      include: {
        book: true, // 책 정보도 같이 보여주고 싶으면! (편함)
      },
    });
  }

  async removeFromWishlist(id: number) {
    return this.db.wishlist.delete({
      where: { id },
    });
  }

  // 유저가 중복 추가할 경우 unique 오류가 나므로 이런 기능도 만들 수 있음
  async removeByUserAndBook(userId: number, bookId: number) {
    return this.db.wishlist.delete({
      where: {
        userId_bookId: {
          userId,
          bookId,
        },
      },
    });
  }
}
