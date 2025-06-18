const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원 가입
router.post("/signup", userController.signup);

// 로그인
router.post("/login", userController.login);

// 로그아웃
router.post("/logout", userController.logout);

// 로그인 상태 확인 (세션 검사용)
router.post("/me", userController.me);

module.exports = router;
