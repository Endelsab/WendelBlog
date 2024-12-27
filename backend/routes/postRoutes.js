import express from "express";

import {
	createPost,
	deletePost,
	getPosts,
} from "../controller/postController.js";

import { protectRoute } from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/createPost", protectRoute, createPost);
router.get("/getPosts", getPosts);
router.delete("/deletePost/:postid", protectRoute, deletePost);

export default router;
