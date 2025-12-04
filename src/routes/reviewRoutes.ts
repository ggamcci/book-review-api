import { Router } from "express";
import { ReviewController } from "../controllers/reviewController";

const router = Router();
const controller = new ReviewController();

// /api/reviews
router.post("/", controller.create);
router.get("/", controller.getList);
router.get("/:id", controller.getOne);
router.patch("/:id", controller.update);
router.delete("/:id", controller.delete);

export default router;
