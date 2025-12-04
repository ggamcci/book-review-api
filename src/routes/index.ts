import { Router } from "express";
import authRouter from "./auth.routes";
import bookRouter from "./book.routes";
import userRouter from "./user.routes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API Root OK" });
});

router.use("/auth", authRouter);
router.use("/books", bookRouter);

// 👉 이제 /api/users 경로가 생김
router.use("/users", userRouter);

export default router;
