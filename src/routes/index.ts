import { Router } from "express";
import authRouter from "./auth.routes";
import bookRouter from "./book.routes";
import userRouter from "./user.routes";
import reviewRoutes from "./reviewRoutes";
import wishlistRoutes from "./wishlistRoutes";
import cartRoutes from "./cartRoutes";
import orderRoutes from "./orderRoutes";

const router = Router();

router.get("/", (req, res) => {
  res.json({ message: "API Root OK" });
});

router.use("/auth", authRouter);
router.use("/books", bookRouter);
router.use("/users", userRouter);
router.use("/reviews", reviewRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/cart", cartRoutes);
router.use("/orders", orderRoutes);

export default router;
