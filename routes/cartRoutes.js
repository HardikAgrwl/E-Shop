import express from "express";
import {
  addCartItems,
  deleteCartItems,
  getCartItems,
  updateCart,
} from "../controllers/cartController.js";
const router = express.Router();

router.get("/:id", getCartItems);
router.post("/:id", addCartItems);
router.put("/:id", updateCart);
router.delete("/:userId/:itemId", deleteCartItems);

export default router;
