import express from "express";
import {
  delete_item,
  get_items,
  post_item,
  update_item,
} from "../controllers/itemController.js";
const router = express.Router();

router.get("/", get_items);
router.post("/", post_item);
router.put("/:id", update_item);
router.delete("/:id", delete_item);

export default router;
