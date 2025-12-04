import { Request, Response, NextFunction } from "express";
import { bookService } from "../services/bookService";

export const bookController = {
  async create(req: Request, res: Response, next: NextFunction) {
    try {
      const { title, author, price, stock, category } = req.body;

      if (!title || !author || price === undefined) {
        const err: any = new Error("Missing required fields");
        err.status = 400;
        throw err;
      }

      const book = await bookService.create({
        title,
        author,
        price: Number(price),
        stock: stock !== undefined ? Number(stock) : undefined,
        category,
      });

      res.status(201).json({ success: true, data: book });
    } catch (err) {
      next(err);
    }
  },

  async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const book = await bookService.getById(id);
      res.json({ success: true, data: book });
    } catch (err) {
      next(err);
    }
  },

  async list(req: Request, res: Response, next: NextFunction) {
    try {
      const { page, size, keyword, category, sort } = req.query;

      const result = await bookService.list({
        page: page ? Number(page) : undefined,
        size: size ? Number(size) : undefined,
        keyword: keyword ? String(keyword) : undefined,
        category: category ? String(category) : undefined,
        sort: sort ? String(sort) : undefined,
      });

      res.json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },

  async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { title, author, price, stock, category } = req.body;

      const book = await bookService.update(id, {
        title,
        author,
        price: price !== undefined ? Number(price) : undefined,
        stock: stock !== undefined ? Number(stock) : undefined,
        category,
      });

      res.json({ success: true, data: book });
    } catch (err) {
      next(err);
    }
  },

  async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const result = await bookService.remove(id);
      res.status(204).json({ success: true, data: result });
    } catch (err) {
      next(err);
    }
  },
};
