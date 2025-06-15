// src/pages/CreatePost.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

function CreatePost({ posts, setPosts }) {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const newPost = {
      id: posts.length + 1, // 실제 서비스에서는 uuid 또는 DB id 사용
      title,
      author,
      date: new Date().toISOString().split("T")[0], // 오늘 날짜 yyyy-mm-dd
      comments: 0,
      content,
    };

    setPosts([...posts, newPost]); // 새 글 추가
    navigate("/"); // 목록으로 이동
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
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
          <input
            type="text"
            placeholder="작성자"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
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
