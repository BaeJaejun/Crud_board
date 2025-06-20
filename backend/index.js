// backend/index.js

// .env 파일을 불러와서 process.env로 사용할 수 있게 함
require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const session = require("express-session");
const MongoStore = require("connect-mongo"); //
const app = express();

// 환경 변수에서 PORT 불러오고, 없으면 5000 사용
const PORT = process.env.PORT || 5000;

// JSON 요청 파싱
app.use(
  cors({
    origin: "http://localhost:5173", // 프론트 주소
    credentials: true,
  })
);
app.use(express.json());

// 2) 세션 미들웨어 설정
app.use(
  session({
    name: "sid", // 세션 쿠키 이름
    secret: process.env.SESSION_SECRET, // .env 에 설정
    resave: false, // 변경 없으면 저장 안 함
    saveUninitialized: false, // 새 세션 생성 시 저장 안 함
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI, // same DB 연결
      collectionName: "sessions",
    }),
    cookie: {
      httpOnly: true, // JS 접근 금지
      secure: false, // HTTPS 환경에서는 true
      sameSite: "lax", // CSRF 방어
      maxAge: 1000 * 60 * 60 * 24, // 1일
    },
  })
);

// DB 연결
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// 라우터 불러오기
const userRoutes = require("./routes/users");
const postRouter = require("./routes/posts");

app.use("/api/users", userRoutes);
app.use("/api/posts", postRouter);

// 서버 시작
app.listen(PORT, () => {
  console.log(`✅ Backend running at http://localhost:${PORT}`);
});
