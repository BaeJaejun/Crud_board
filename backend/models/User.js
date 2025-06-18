// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // 중복 방지
      trim: true, // 공백 자동 제거
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true } // createdAt, updatedAt 자동 생성
);

module.exports = mongoose.model("User", userSchema);
