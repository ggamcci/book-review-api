import { Router } from "express";
import { WishlistController } from "../controllers/wishlistController";

const router = Router();
const controller = new WishlistController();

// POST /api/wishlist → 찜 추가
router.post("/", controller.add);

// GET /api/wishlist/user/:userId → 유저 찜 목록 조회
router.get("/user/:userId", controller.listByUser);

// DELETE /api/wishlist/:id → 찜 제거
router.delete("/:id", controller.remove);

export default router;
