import { Router } from "express";
import { CartController } from "../controllers/cartController";
import { requireAuth } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  addCartSchema,
  updateCartSchema,
} from "../validators/cartValidator";

const router = Router();
const controller = new CartController();

/**
 * @swagger
 * tags:
 *   name: Cart
 *   description: 장바구니 관리 API
 */

/**
 * @swagger
 * /api/cart:
 *   post:
 *     summary: 장바구니에 도서 추가
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - bookId
 *               - quantity
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 3
 *               quantity:
 *                 type: integer
 *                 example: 2
 *     responses:
 *       201:
 *         description: 장바구니 추가 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 사용자 또는 도서 없음
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/",
  requireAuth,
  validate(addCartSchema),
  controller.add
);

/**
 * @swagger
 * /api/cart/user/{userId}:
 *   get:
 *     summary: 특정 유저의 장바구니 조회
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 사용자 ID
 *     responses:
 *       200:
 *         description: 장바구니 조회 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 장바구니 없음
 *       500:
 *         description: 서버 오류
 */
router.get(
  "/user/:userId",
  requireAuth,
  controller.listByUser
);

/**
 * @swagger
 * /api/cart/{id}:
 *   patch:
 *     summary: 장바구니 수량 수정
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: CartItem ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - quantity
 *             properties:
 *               quantity:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: 수량 변경 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 장바구니 항목 없음
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.patch(
  "/:id",
  requireAuth,
  validate(updateCartSchema),
  controller.updateQuantity
);

/**
 * @swagger
 * /api/cart/{id}:
 *   delete:
 *     summary: 장바구니 항목 삭제
 *     tags: [Cart]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: CartItem ID
 *     responses:
 *       204:
 *         description: 장바구니 삭제 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 장바구니 항목 없음
 *       500:
 *         description: 서버 오류
 */
router.delete(
  "/:id",
  requireAuth,
  controller.remove
);

export default router;
