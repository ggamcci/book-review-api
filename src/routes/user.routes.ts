import { Router } from "express";
import { userController } from "../controllers/userController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";

const router = Router();

// 관리자만 사용자 권한 변경 허용
router.patch(
  "/:id/role",
  requireAuth,
  requireRole("ADMIN"),
  userController.changeRole
);

export default router;
