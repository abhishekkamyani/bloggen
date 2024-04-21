const express = require('express');
const router = express.Router();
const postController = require('../controllers/post');
// const upload = require("../middlewares/multer.middleware");
const upload = require("../middlewares/multer.middleware");

router
// .get('', postController.getCategoryPosts)
.post('/create',upload.single("blogCover"), postController.createPost)
.get('/all', postController.getAllPosts)
.get('/:slug', postController.getPost)
.patch('/:id/like', postController.likePost)
.patch('/:id/dislike', postController.dislikePost)

module.exports = router;