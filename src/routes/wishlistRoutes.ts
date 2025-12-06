import { Router } from "express";
import { WishlistController } from "../controllers/wishlistController";

const router = Router();
const controller = new WishlistController();

/**
 * @swagger
 * tags:
 *   name: Wishlist
 *   description: 찜(위시리스트) 관리 API
 */

/**
 * @swagger
 * /api/wishlist:
 *   post:
 *     summary: 도서 찜 추가
 *     tags: [Wishlist]
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
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *                 description: 사용자 ID
 *               bookId:
 *                 type: integer
 *                 example: 5
 *                 description: 찜할 도서 ID
 *     responses:
 *       201:
 *         description: 찜 추가 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 사용자 또는 도서가 존재하지 않음
 *       409:
 *         description: 이미 찜한 도서
 *       500:
 *         description: 서버 오류
 */
router.post("/", controller.add); // 찜 추가

/**
 * @swagger
 * /api/wishlist/user/{userId}:
 *   get:
 *     summary: 특정 유저의 찜 목록 조회
 *     tags: [Wishlist]
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
 *         description: 찜 목록 조회 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 찜 목록이 없음
 *       500:
 *         description: 서버 오류
 */
router.get("/user/:userId", controller.listByUser); // 유저 찜 조회

/**
 * @swagger
 * /api/wishlist/{id}:
 *   delete:
 *     summary: 찜 제거
 *     tags: [Wishlist]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 15
 *         description: Wishlist ID
 *     responses:
 *       204:
 *         description: 찜 삭제 성공
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 찜 데이터 없음
 *       500:
 *         description: 서버 오류
 */
router.delete("/:id", controller.remove); // 찜 제거

export default router;
