// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // 실제 요청은 /api/posts, /api/login 등으로 구성됨
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

// 게시글 목록 가져오기
export const fetchPosts = () => api.get("/posts");

// 게시글 하나 가져오기
export const fetchPostById = (id) => api.get(`/posts/${id}`);

// 게시글 생성
export const createPost = (data) => api.post("/posts", data);

// 게시글 삭제
export const deletePost = (id) => api.delete(`/posts/${id}`);

// 로그인
export const loginUser = (data) => api.post("/users/login", data);

// 회원가입
export const signupUser = (data) => api.post("/users/signup", data);

// 댓글 등록
export const addCommentToPost = (postId, commentData) =>
  api.post(`/posts/${postId}/comments`, commentData);

// 댓글 삭제
export const deleteComment = (postId, commentId) =>
  api.delete(`/posts/${postId}/comments/${commentId}`);

export default api;
