// routes/posts.js
const express = require("express");
const router = express.Router();
const postController = require("../controllers/postController");
const auth = require("../middleware/auth");

// ---누구나 가능---

// 전체 게시글 조회
router.get("/", postController.getAllPosts);

// 게시글 상세 조회
router.get("/:id", postController.getPostById);

// ---로그인 필요---

// 게시글 작성
router.post("/", postController.createPost);

// 게시글 삭제
router.delete("/:id", postController.deletePost);

// 댓글 추가
router.post("/:id/comments", postController.addComment);

// 댓글 삭제
router.delete("/:id/comments/:commentId", postController.deleteComment);

module.exports = router;
