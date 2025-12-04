import { Router } from "express";
import authRouter from "./auth.routes";
import bookRouter from "./book.routes";
import userRouter from "./user.routes";
import reviewRoutes from "./reviewRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API Root OK" });
});

router.use("/auth", authRouter);
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRoutes);

export default router;
