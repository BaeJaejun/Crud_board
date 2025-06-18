// controllers/userController.js
const User = require("../models/User");

// 회원가입
exports.signup = async (req, res) => {
  const { username, password } = req.body;

  try {
    const existing = await User.findOne({ username });
    if (existing) {
      return res.status(409).json({ message: "이미 존재하는 사용자입니다." });
    }

    const newUser = new User({ username, password }); // 나중에 해싱 필요
    await newUser.save();

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

    if (!user || user.password !== password) {
      return res
        .status(401)
        .json({ message: "아이디 또는 비밀번호가 틀렸습니다." });
    }

    // 로그인 성공 → 토큰 발급은 나중에
    res.json({ message: "로그인 성공", username });
  } catch (err) {
    res.status(500).json({ message: "로그인 실패", error: err.message });
  }
};
