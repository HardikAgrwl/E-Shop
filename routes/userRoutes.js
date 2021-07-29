import express from "express";
import userController from "../controllers/userController.js";
import auth from "../middlewares/auth.js";
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user", auth, userController.get_user);

export default router;
