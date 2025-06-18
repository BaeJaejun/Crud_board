const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// 회원 가입
router.post("/signup", userController.signup);

// 로그인
router.post("/login", userController.login);

module.exports = router;
