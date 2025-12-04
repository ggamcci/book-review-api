import { prisma } from "../db";

export const userService = {
  async changeRole(userId: number, newRole: string) {
    if (!["USER", "ADMIN"].includes(newRole)) {
      const err: any = new Error("Invalid role");
      err.status = 400;
      throw err;
    }

    // 유저 존재 여부 확인
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      const err: any = new Error("User not found");
      err.status = 404;
      throw err;
    }

    // role 변경 수행
    const updated = await prisma.user.update({
      where: { id: userId },
      data: { userRole: newRole },
    });

    return updated;
  },
};
