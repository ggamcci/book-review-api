import { Router } from "express";
import { authController } from "../controllers/authController";
import { requireAuth } from "../middlewares/authMiddleware";
import { validate } from "../middlewares/validate";
import { signupSchema, loginSchema } from "../validators/authValidator";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: 인증 관련 API
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: 회원가입
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 example: user1
 *               email:
 *                 type: string
 *                 example: user1@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       201:
 *         description: 회원가입 성공
 *       400:
 *         description: 잘못된 요청
 *       409:
 *         description: 이메일 중복
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.post("/signup", validate(signupSchema), authController.signup);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: 로그인 (JWT 토큰 발급)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: 1234
 *     responses:
 *       200:
 *         description: 로그인 성공 (AccessToken, RefreshToken 반환)
 *       401:
 *         description: 비밀번호 오류
 *       404:
 *         description: 사용자 없음
 *       422:
 *         description: 입력값 검증 실패 (VALIDATION_FAILED)
 *       500:
 *         description: 서버 오류
 */
router.post("/login", validate(loginSchema), authController.login);

/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: 토큰 재발급
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - refreshToken
 *             properties:
 *               refreshToken:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *     responses:
 *       200:
 *         description: AccessToken 재발급 성공
 *       401:
 *         description: RefreshToken 만료 또는 위조
 *       500:
 *         description: 서버 오류
 */
router.post("/refresh", authController.refresh);

/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: 내 정보 조회 (로그인 필요)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: 사용자 정보 반환
 *       401:
 *         description: 토큰 없음 또는 만료
 *       500:
 *         description: 서버 오류
 */
router.get("/me", requireAuth, authController.me);

export default router;
