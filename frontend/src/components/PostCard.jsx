// frontend/src/components/PostCard.jsx
function PostCard({ title, author, date, comments = 0 }) {
  return (
    <div className="border p-4 rounded shadow mb-4 hover:bg-gray-50 transition">
      <h2 className="text-lg font-semibold">{title}</h2>
      <div className="text-sm text-gray-500 mt-1">
        {author} · {date} · 💬 {comments}개
      </div>
    </div>
  );
}

export default PostCard;
