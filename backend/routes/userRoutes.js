import express from "express";
import { login, logout, signUp } from "../controller/userController.js";

const router = express.Router();

router.post("/signUp", signUp);
router.post("/login", login);
router.post("/logout", logout);

export default router;
