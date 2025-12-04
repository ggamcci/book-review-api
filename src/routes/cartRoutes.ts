import { Router } from "express";
import { CartController } from "../controllers/cartController";

const router = Router();
const controller = new CartController();

router.post("/", controller.add);               // 장바구니 추가
router.get("/user/:userId", controller.listByUser); // 유저 장바구니 조회
router.patch("/:id", controller.updateQuantity);   // 수량 변경
router.delete("/:id", controller.remove);          // 삭제

export default router;
