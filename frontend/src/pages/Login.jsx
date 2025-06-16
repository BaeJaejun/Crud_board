// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { loginUser } from "../api/api";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await loginUser({ username, password });

      // 로그인 성공 시 사용자 이름 저장
      localStorage.setItem("username", res.data.username); // 또는 res.data.user 등 백엔드 응답에 따라 조정

      alert("로그인 성공!");
      navigate("/"); // 홈으로 이동
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">로그인</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="아이디"
            className="w-full border p-2 rounded"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="비밀번호"
            className="w-full border p-2 rounded"
            required
          />
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
          >
            로그인
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
