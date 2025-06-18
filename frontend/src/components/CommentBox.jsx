// src/components/CommentBox.jsx
// 댓글 입력 UI 컴포넌트 (작성자 + 댓글 내용 입력 → 상위 컴포넌트로 전달)

import { useState } from "react";

function CommentBox({ onSubmit, author }) {
  // 입력값 상태: 작성자, 댓글 내용
  const [commentContent, setCommentContent] = useState("");

  // 폼 제출 핸들러
  const handleAddComment = (e) => {
    e.preventDefault(); // 새로고침 방지

    // 유효성 검사: 공백 입력 방지
    if (!commentContent.trim()) return;

    // 상위 컴포넌트(PostDetail 등)로 댓글 객체 전달
    onSubmit({
      author, // props로 전달된 작성자
      content: commentContent,
    });

    // 입력값 초기화
    setCommentContent("");
  };

  return (
    <form onSubmit={handleAddComment} className="space-y-2">
      {/* 댓글 내용 입력 */}
      <textarea
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        placeholder="댓글을 입력하세요"
        className="w-full border p-2 rounded h-24 resize-none"
        required
      />

      {/* 등록 버튼 */}
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        댓글 등록
      </button>
    </form>
  );
}

export default CommentBox;
