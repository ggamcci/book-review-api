import { Router } from "express";
import { OrderController } from "../controllers/orderController";

const router = Router();
const controller = new OrderController();

router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/user/:userId", controller.getByUser);
router.get("/:id", controller.getOne);
router.patch("/:id", controller.updateStatus);
router.delete("/:id", controller.delete);

export default router;
