import express from "express";
import orderController from "../controllers/orderController.js";
const router = express.router();

router.get("/:id", orderController.getOrderDetails);
router.post("/:id", cartController.checkout);

export default router;
