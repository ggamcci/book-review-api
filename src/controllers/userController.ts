import { Request, Response, NextFunction } from "express";
import { userService } from "../services/userService";

export const userController = {
  async changeRole(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const { role } = req.body;

      const updated = await userService.changeRole(id, role);

      res.json({
        success: true,
        data: {
          id: updated.id,
          email: updated.email,
          role: updated.userRole,
        },
      });
    } catch (err) {
      next(err);
    }
  },
};
