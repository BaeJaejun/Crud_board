// src/components/PostCard.jsx
import { Link } from "react-router-dom";

// props로 post 객체를 받아서 게시글 내용을 렌더링
function PostCard({ post }) {
  return (
    // 카드 스타일: 테두리, 아래쪽 간격, 그림자, 패딩, 둥근 모서리
    <div className="border rounded-lg p-4 mb-4 shadow hover:bg-gray-200 transition">
      {/* 제목: 클릭 시 해당 게시글 상세페이지로 이동 */}
      <Link to={`/post/${post.id}`}>
        <h2 className="text-xl font-semibold text-black-600 hover:underline">
          {post.title}
        </h2>
      </Link>

      {/* 작성자 및 날짜 */}
      <div className="text-xs text-gray-500 mt-2">
        작성자: {post.author} | {post.date}
      </div>

      {/* 본문 미리보기 */}
      <p className="text-gray-600 mt-2">
        {post.content.length > 30
          ? post.content.slice(0, 30) + "..."
          : post.content}
      </p>

      {/* 댓글 수 */}
      <div className="text-sm text-gray-400 mt-2">
        💬 댓글 {post.comments.length}개
      </div>
    </div>
  );
}

export default PostCard;
