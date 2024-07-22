import express from "express";
import { addPost, deletePost, getMyPosts, getPost, getPosts, updatePost } from "../controllers/post.js";

const router = express.Router();

router.get("/", getPosts) ;
router.get("/:id", getPost);
router.get('/myposts', getMyPosts); 
router.post("/", addPost);
router.delete("/:id", deletePost);
router.put("/:id", updatePost);

export default router;