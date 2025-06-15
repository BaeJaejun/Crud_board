import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import BoardList from "./pages/BoardList";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // 더미 게시글 데이터 (백엔드 연결 전까지 사용)
  const [posts, setPosts] = useState([
    {
      id: 1,
      title: "첫 글",
      author: "홍길동",
      date: "2025-06-15",
      content:
        "내용용내용용요용내용용요용내용용요용내용용요용내용용요용요용내용용요용내용용요용내용용요용내용용요용내용용요용",
      comments: [
        // 배열로 관리
        { id: 1, author: "댓글러", content: "좋은 글요!" },
        { id: 2, author: "또다른댓글러", content: "감사요." },
      ],
    },
    {
      id: 2,
      title: "두 번째 글",
      author: "김철수",
      date: "2025-06-14",
      content: "내용용요용22",
      comments: [
        { id: 1, author: "댓글쓴이", content: "좋은 글이네요!" },
        { id: 2, author: "또다른사람", content: "동감합니다." },
      ],
    },
  ]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<BoardList posts={posts} />} />
        <Route path="/post/:id" element={<PostDetail posts={posts} />} />
        <Route
          path="/new"
          element={<CreatePost posts={posts} setPosts={setPosts} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
