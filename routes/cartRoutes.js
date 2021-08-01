import express from "express";
import {
  addCartItems,
  deleteCartItems,
  getCartItems,
} from "../controllers/cartController.js";
const router = express.router();

router.get("/:id", getCartItems);
router.post("/:id", addCartItems);
router.delete("/:userId/:itemId", deleteCartItems);

export default router;
