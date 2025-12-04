import { BaseService } from "./baseService";

export class CartService extends BaseService {
  async addToCart(data: { userId: number; bookId: number; quantity: number }) {
    try {
      return await this.db.cartItem.create({ data });
    } catch (err: any) {
      // 이미 존재하는 userId + bookId 조합 → 수량만 증가
      if (err.code === "P2002") {
        return await this.db.cartItem.update({
          where: {
            userId_bookId: {
              userId: data.userId,
              bookId: data.bookId,
            },
          },
          data: {
            quantity: { increment: data.quantity },
          },
        });
      }
      throw err;
    }
  }

  async getCartByUser(userId: number) {
    return this.db.cartItem.findMany({
      where: { userId },
      include: { book: true },
    });
  }

  async updateQuantity(id: number, quantity: number) {
    return this.db.cartItem.update({
      where: { id },
      data: { quantity },
    });
  }

  async remove(id: number) {
    return this.db.cartItem.delete({
      where: { id },
    });
  }
}
