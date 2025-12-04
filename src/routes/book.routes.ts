import { Router } from "express";
import { bookController } from "../controllers/bookController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";

const router = Router();

// 목록 조회 + 검색/정렬/페이지네이션
router.get("/", bookController.list);

// 단건 조회
router.get("/:id", bookController.getById);

// 관리자만 생성
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  bookController.create
);

// 관리자만 수정
router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  bookController.update
);

// 관리자만 삭제
router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  bookController.remove
);

export default router;
