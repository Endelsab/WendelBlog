import express from "express";
import {
	login,
	logout,
	signUp,
	getUser,
} from "../controller/userController.js";
import { protectRoute } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logout);

router.get("/getUser", protectRoute, getUser);

export default router;
