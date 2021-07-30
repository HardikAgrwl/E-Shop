import express from "express";
import cartController from "../controllers/cartController.js";
const router = express.router();

router.get("/:id", cartController.getCartItems);
router.post("/:id", cartController.addCartItems);
router.delete("/:userId/:itemId", cartController.deleteCartItems);

export default router;
