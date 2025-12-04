import { BaseService } from "./baseService";

export class OrderService extends BaseService {
  async createOrder(data: {
    userId: number;
    bookId: number;
    paymentMethod: string;
  }) {
    // Book 가격 가져오기
    const book = await this.db.book.findUnique({
      where: { id: data.bookId }
    });

    if (!book) throw new Error("Book not found");

    const totalPrice = book.price;

    return this.db.order.create({
      data: {
        userId: data.userId,
        bookId: data.bookId,
        totalPrice,
        status: "PENDING",
        paymentMethod: data.paymentMethod
      }
    });
  }

  async getAllOrders() {
    return this.db.order.findMany({
      include: { user: true, book: true }
    });
  }

  async getOrdersByUser(userId: number) {
    return this.db.order.findMany({
      where: { userId },
      include: { book: true }
    });
  }

  async getOrderById(id: number) {
    return this.db.order.findUnique({
      where: { id },
      include: { user: true, book: true }
    });
  }

  async updateStatus(id: number, status: string) {
    return this.db.order.update({
      where: { id },
      data: { status }
    });
  }

  async deleteOrder(id: number) {
    return this.db.order.delete({
      where: { id }
    });
  }
}
