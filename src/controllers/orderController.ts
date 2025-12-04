import { Request, Response, NextFunction } from "express";
import { BaseController } from "./baseController";
import { OrderService } from "../services/orderService";

const orderService = new OrderService();

export class OrderController extends BaseController {
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { userId, bookId, paymentMethod } = req.body;

      if (!userId || !bookId || !paymentMethod) {
        return this.error(res, 400, "userId, bookId, paymentMethod는 필수입니다.");
      }

      const order = await orderService.createOrder({
        userId: Number(userId),
        bookId: Number(bookId),
        paymentMethod
      });

      this.success(res, order);
    } catch (err) {
      next(err);
    }
  };

  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders = await orderService.getAllOrders();
      this.success(res, orders);
    } catch (err) {
      next(err);
    }
  };

  getByUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const userId = Number(req.params.userId);
      const orders = await orderService.getOrdersByUser(userId);
      this.success(res, orders);
    } catch (err) {
      next(err);
    }
  };

  getOne = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const order = await orderService.getOrderById(id);
      this.success(res, order);
    } catch (err) {
      next(err);
    }
  };

  updateStatus = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      const { status } = req.body;

      const updated = await orderService.updateStatus(id, status);

      this.success(res, updated);
    } catch (err) {
      next(err);
    }
  };

  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const id = Number(req.params.id);
      await orderService.deleteOrder(id);

      this.success(res, { id });
    } catch (err) {
      next(err);
    }
  };
}
