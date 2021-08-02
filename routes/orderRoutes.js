import express from "express";
import { checkout, getOrderDetails } from "../controllers/orderController.js";
const router = express.Router();

router.get("/:id", getOrderDetails);
router.post("/:id", checkout);

export default router;
