import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";

const router = Router();
const controller = new ReviewController();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: 리뷰 관리 API
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: 리뷰 작성
 *     tags: [Reviews]
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
 *               - rating
 *               - content
 *             properties:
 *               userId:
 *                 type: integer
 *                 example: 1
 *               bookId:
 *                 type: integer
 *                 example: 3
 *               rating:
 *                 type: integer
 *                 example: 5
 *               content:
 *                 type: string
 *                 example: 정말 도움이 많이 되는 책입니다.
 *     responses:
 *       201:
 *         description: 리뷰 작성 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       404:
 *         description: 사용자 또는 도서가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.post("/", controller.create);

/**
 * @swagger
 * /api/reviews:
 *   get:
 *     summary: 리뷰 전체 목록 조회
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: 리뷰 목록 조회 성공
 *       500:
 *         description: 서버 오류
 */
router.get("/", controller.getList);

/**
 * @swagger
 * /api/reviews/{id}:
 *   get:
 *     summary: 리뷰 단건 조회
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 리뷰 ID
 *         description: 리뷰 ID
 *     responses:
 *       200:
 *         description: 리뷰 조회 성공
 *       404:
 *         description: 리뷰가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.get("/:id", controller.getOne);

/**
 * @swagger
 * /api/reviews/{id}:
 *   patch:
 *     summary: 리뷰 수정
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 리뷰ID
 *         description: 리뷰 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rating:
 *                 type: integer
 *                 example: 4
 *               content:
 *                 type: string
 *                 example: 수정된 리뷰 내용입니다.
 *     responses:
 *       200:
 *         description: 리뷰 수정 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 수정 권한 없음
 *       404:
 *         description: 리뷰가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.patch("/:id", controller.update);

/**
 * @swagger
 * /api/reviews/{id}:
 *   delete:
 *     summary: 리뷰 삭제
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 리뷰 ID
 *         description: 리뷰 ID
 *     responses:
 *       204:
 *         description: 리뷰 삭제 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 삭제 권한 없음
 *       404:
 *         description: 리뷰가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.delete("/:id", controller.delete);

export default router;
