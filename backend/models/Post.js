// models/Post.js
const mongoose = require("mongoose");

// 댓글 스키마 (Post에 포함됨)
const commentSchema = new mongoose.Schema({
  author: { type: String, required: true }, // 댓글 작성자
  content: { type: String, required: true }, // 댓글 내용
  createdAt: { type: Date, default: Date.now }, // 생성 시간
});

// 게시글 스키마
const postSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true }, // 게시글 작성자
    comments: [commentSchema], // 중첩된 댓글 배열
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);
