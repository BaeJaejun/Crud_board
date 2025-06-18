// src/pages/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPost } from "../api/api";

function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const author = localStorage.getItem("username"); // 로그인된 사용자명

    // 유효성 검사
    if (!title.trim() || !content.trim())
      return alert("제목과 내용을 입력해주세요.");
    if (!author) return alert("로그인이 필요합니다.");

    try {
      const res = await createPost({
        title,
        content,
        author, // 작성자는 따로 입력받지 않음
        date: new Date().toISOString().split("T")[0], // 오늘 날짜 yyyy-mm-dd
      });

      const newPost = res.data;
      setPosts([...posts, newPost]); // 로컬 상태 업데이트
      navigate("/"); // 목록 페이지로 이동
    } catch (err) {
      console.error("게시글 등록 실패:", err);
      alert("게시글 등록에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-2xl mx-auto p-6 bg-white shadow mt-10 rounded">
        <h2 className="text-xl font-bold mb-4">새 글 작성</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="제목"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
            required
          />
          <textarea
            placeholder="내용"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded h-40 resize-none"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            등록
          </button>
        </form>
      </div>
    </div>
  );
}

export default CreatePost;
