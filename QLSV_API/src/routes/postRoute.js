const express = require("express");

const authMiddleware = require("../middleware/auth");
const { createPostController, getPostsController, getPostByIdController, updatePostController, deletePostController } = require("../controllers/postController");

const postRouter = express.Router();

postRouter.post("/", authMiddleware, createPostController);
postRouter.get("/", getPostsController);
postRouter.get("/:id", getPostByIdController);
postRouter.put("/:id", authMiddleware, updatePostController);
postRouter.delete("/:id", authMiddleware, deletePostController);

module.exports = postRouter;
