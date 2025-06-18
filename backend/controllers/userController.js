// controllers/userController.js
const User = require("../models/User");
const bcrypt = require("bcrypt");

// 회원가입
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "이미 존재하는 사용자입니다." });
    }

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, password: hash });
    await newUser.save();

    // 가입 직후 자동 로그인
    req.session.userId = newUser._id;

    res.status(201).json({ message: "회원가입 성공", username });
  } catch (err) {
    res.status(500).json({ message: "회원가입 실패", error: err.message });
  }
};

// 로그인
exports.login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    req.session.userId = user._id; // 세션에 사용자 ID 저장

    res.json({ message: "로그인 성공", username });
  } catch (err) {
    res.status(500).json({ message: "로그인 실패", error: err.message });
  }
};

// 로그아웃
exports.logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "로그아웃 실패" });
    res.clearCookie("sid"); // 세션 쿠키 제거
    res.json({ message: "로그아웃 성공" });
  });
};

// 로그인 상태 확인 (세션 검사용)
exports.me = async (req, res) => {
  if (!req.session.userId)
    return res.status(401).json({ message: "로그인 필요" });
  const user = await User.findById(req.session.userId);
  res.json({ username: user.username });
};
