import { useState, useEffect } from "react";
import { loginMe, fetchPosts, logoutUser } from "./api/api";
import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import Header from "./components/Header";
import BoardList from "./pages/BoardList";
import PostDetail from "./pages/PostDetail";
import CreatePost from "./pages/CreatePost";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  // 게시글 목록을 상태로 관리 (초기값은 빈 배열)
  const [posts, setPosts] = useState([]);

  // 로그인된 사용자명 상태
  const [username, setUsername] = useState(localStorage.getItem("username"));

  // 컴포넌트가 처음 마운트될 때 게시글 목록을 서버에서 불러옴
  useEffect(() => {
    fetchPosts()
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("불러오기 실패:", err));
  }, []);

  // 2) 페이지 진입/새로고침 시 세션 상태 확인
  useEffect(() => {
    loginMe()
      .then((res) => {
        setUsername(res.data.username);
        localStorage.setItem("username", res.data.username);
      })
      .catch((err) => {
        // 401이면 그냥 로그인 안 된 상태
        if (err.response?.status === 401) {
          setUsername(null);
          localStorage.removeItem("username");
        } else {
          // 그 외 네트워크 오류 등은 로그로 남겨두기
          console.error("세션 확인 중 오류:", err);
        }
      });
  }, []);

  return (
    <BrowserRouter>
      <Header
        username={username}
        onLogout={() => {
          logoutUser().finally(() => {
            setUsername(null);
            localStorage.removeItem("username");
          });
        }}
      />
      <Routes>
        <Route path="/" element={<BoardList posts={posts} />} />
        <Route path="/post/:id" element={<PostDetail />} />
        <Route
          path="/new"
          element={<CreatePost posts={posts} setPosts={setPosts} />}
        />
        <Route path="/login" element={<Login onLogin={setUsername} />} />
        <Route path="/signup" element={<Signup onSignup={setUsername} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
