import { Router } from "express";
import { userController } from "../controllers/userController";
import { requireAuth, requireRole } from "../middlewares/authMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: 사용자 관리 API (관리자 전용)
 */

/**
 * @swagger
 * /api/users/{id}/role:
 *   patch:
 *     summary: 사용자 권한 변경 (관리자 전용)
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: 권한을 변경할 사용자 ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - role
 *             properties:
 *               role:
 *                 type: string
 *                 example: ADMIN
 *                 description: 변경할 권한 (USER 또는 ADMIN)
 *     responses:
 *       200:
 *         description: 사용자 권한 변경 성공
 *       400:
 *         description: 잘못된 role 값
 *       401:
 *         description: 인증 필요
 *       403:
 *         description: 관리자 권한 필요
 *       404:
 *         description: 사용자가 존재하지 않음
 *       500:
 *         description: 서버 오류
 */
router.patch(
  "/:id/role",
  requireAuth,
  requireRole("ADMIN"),
  userController.changeRole
);

export default router;
