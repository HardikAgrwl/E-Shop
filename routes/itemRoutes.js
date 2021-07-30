import express from "express";
import itemController from "../controllers/itemController.js";
const router = express.Router();

router.get("/", itemController.get_items);
router.post("/", itemController.post_item);
router.put("/:id", itemController.update_item);
router.delete("/:id", itemController.delete_item);

export default router;
