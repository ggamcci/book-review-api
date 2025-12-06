import { Router } from "express";
import { bookController } from "../controllers/bookController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import {
  createBookSchema,
  updateBookSchema,
} from "../validators/bookValidator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Books
 *   description: 도서 관리 API
 */

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: 도서 목록 조회 (검색/정렬/페이지네이션)
 *     tags: [Books]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *           example: 0
 *         description: 페이지 번호
 *       - in: query
 *         name: size
 *         schema:
 *           type: integer
 *           example: 10
 *         description: 페이지당 데이터 개수
 *       - in: query
 *         name: sort
 *         schema:
 *           type: string
 *           example: price,DESC
 *         description: 정렬 조건 (field,ASC|DESC)
 *       - in: query
 *         name: keyword
 *         schema:
 *           type: string
 *           example: node
 *         description: 도서 제목 검색 키워드
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           example: Programming
 *         description: 카테고리 필터
 *     responses:
 *       200:
 *         description: 도서 목록 조회 성공
 *       400:
 *         description: 잘못된 쿼리 파라미터
 *       500:
 *         description: 서버 오류
 */
router.get("/", bookController.list);

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: 도서 단건 조회
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 도서 ID
 *     responses:
 *       200:
 *         description: 도서 조회 성공
 *       404:
 *         description: 도서가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.get("/:id", bookController.getById);

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: 도서 등록 (관리자 전용)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - price
 *               - stock
 *             properties:
 *               title:
 *                 type: string
 *                 example: Node.js Deep Dive
 *               author:
 *                 type: string
 *                 example: 관리자
 *               price:
 *                 type: number
 *                 example: 25000
 *               stock:
 *                 type: number
 *                 example: 10
 *               category:
 *                 type: string
 *                 example: Programming
 *     responses:
 *       201:
 *         description: 도서 등록 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.post(
  "/",
  requireAuth,
  requireRole("ADMIN"),
  validate(createBookSchema),
  bookController.create
);

/**
 * @swagger
 * /api/books/{id}:
 *   patch:
 *     summary: 도서 수정 (관리자 전용)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 도서 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 example: 수정된 제목
 *               author:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: number
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: 도서 수정 성공
 *       400:
 *         description: 잘못된 요청
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 도서가 존재하지 않음
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.patch(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  validate(updateBookSchema),
  bookController.update
);

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: 도서 삭제 (관리자 전용)
 *     tags: [Books]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *         description: 도서 ID
 *     responses:
 *       204:
 *         description: 도서 삭제 성공
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 도서가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.delete(
  "/:id",
  requireAuth,
  requireRole("ADMIN"),
  bookController.remove
);

export default router;
