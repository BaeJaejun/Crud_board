// frontend/src/components/Header.jsx
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-black text-white px-6 py-4 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        📌 CRUD 게시판
      </Link>
      <nav className="space-x-4">
        <Link to="/login" className="hover:underline">
          로그인
        </Link>
        <Link to="/signup" className="hover:underline">
          회원가입
        </Link>
        <Link
          to="/new"
          className="bg-white text-black px-3 py-1 rounded hover:bg-gray-200"
        >
          글쓰기
        </Link>
      </nav>
    </header>
  );
}

export default Header;
