const express = require("express");
const router = express.Router();

const postController = require("../controllers/post");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = require("../middlewares/multer.middleware");

router
  // .get('', postController.getCategoryPosts)
  .post(
    "/create",
    authMiddleware,
    upload.single("blogCover"),
    postController.createPost
  )
  .get("/all", postController.getAllPosts)
  .get("/all/:userId", postController.getAllPosts)
  .get("/:slug", postController.getPost)
  .patch("/:id/like", authMiddleware, postController.likePost)
  .patch("/:id/dislike", authMiddleware, postController.dislikePost)
  .get("/", postController.userPosts)
  .get("/likedPosts", authMiddleware, postController.likedPosts);

module.exports = router;
