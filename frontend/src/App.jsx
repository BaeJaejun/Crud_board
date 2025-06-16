import { useState, useEffect } from "react";
import { fetchPosts } from "./api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import BoardList from "./pages/BoardList";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // 게시글 목록을 상태로 관리 (초기값은 빈 배열)
  const [posts, setPosts] = useState([]);

  // 컴포넌트가 처음 마운트될 때 게시글 목록을 서버에서 불러옴
  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

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
