// frontend/src/components/CommentBox.jsx
import { useState } from "react";

function CommentBox() {
  const [comment, setComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`입력한 댓글: ${comment}`);
    setComment("");
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6">
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="댓글을 입력하세요..."
        className="w-full border p-3 rounded resize-none"
        rows={4}
      />
      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        댓글 작성
      </button>
    </form>
  );
}

export default CommentBox;
