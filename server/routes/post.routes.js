import express from "express";
import {
  addPost,
  deleteUserPost,
  getPost,
  getPosts,
  getUserPosts,
} from "../controllers/post.controller.js";
import protectRoutes from "../middleware/protectRoutes.js";

const router = express.Router();

router.post("/add", protectRoutes, addPost);
router.get("/", getPosts);
router.get("/:id", getPost);
router.get("/user/:id", protectRoutes, getUserPosts);
router.delete("/delete/:id", deleteUserPost);

export default router;
