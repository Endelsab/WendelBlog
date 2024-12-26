import express from "express";
import { createPost, deletePost, getPost } from "../controller/postController.js";

const router = express.Router();

router.post("/createPost", createPost);
router.get("/getPost", getPost);
router.delete("/deletePost/:postid", deletePost);

export default router;
