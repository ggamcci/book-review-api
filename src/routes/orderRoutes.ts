import { Router } from "express";
import { OrderController } from "../controllers/orderController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createOrderSchema,
  updateOrderStatusSchema,
} from "../validators/orderValidator";

const router = Router();
const controller = new OrderController();

/**
 * @swagger
 * tags:
 *   name: Orders
 *   description: 주문 관리 API
 */

/**
 * @swagger
 * /api/orders:
 *   post:
 *     summary: 주문 생성
 *     tags: [Orders]
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
 *               - totalPrice
 *               - status
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 3
 *               totalPrice:
 *                 type: number
 *                 example: 25000
 *               status:
 *                 type: string
 *                 example: ORDERED
 *               paymentMethod:
 *                 type: string
 *                 example: CARD
 *     responses:
 *       201:
 *         description: 주문 생성 성공
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
  validate(createOrderSchema),
  controller.create
);

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: 전체 주문 목록 조회 (관리자용)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 주문 목록 조회 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       500:
 *         description: 서버 오류
 */
router.get(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  controller.getAll
);

/**
 * @swagger
 * /api/orders/user/{userId}:
 *   get:
 *     summary: 특정 유저 주문 내역 조회
 *     tags: [Orders]
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
 *         description: 유저 주문 내역 조회 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 주문 내역 없음
 *       500:
 *         description: 서버 오류
 */
router.get(
  "/user/:userId",
  requireAuth,
  controller.getByUser
);

/**
 * @swagger
 * /api/orders/{id}:
 *   get:
 *     summary: 주문 단건 조회
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 주문 ID
 *     responses:
 *       200:
 *         description: 주문 조회 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 주문이 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.get(
  "/:id",
  requireAuth,
  controller.getOne
);

/**
 * @swagger
 * /api/orders/{id}:
 *   patch:
 *     summary: 주문 상태 수정 (관리자용)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 주문 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 example: COMPLETED
 *     responses:
 *       200:
 *         description: 주문 상태 변경 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 주문이 존재하지 않음
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateOrderStatusSchema),
  controller.updateStatus
);

/**
 * @swagger
 * /api/orders/{id}:
 *   delete:
 *     summary: 주문 삭제 (관리자용)
 *     tags: [Orders]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 주문 ID
 *     responses:
 *       204:
 *         description: 주문 삭제 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 주문이 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  controller.delete
);

export default router;
