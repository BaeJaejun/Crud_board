// src/pages/BoardList.jsx
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { Link } from "react-router-dom";

// 게시판 리스트 페이지 컴포넌트
function BoardList({ posts }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      {/* 전체 페이지 레이아웃: 중앙 정렬 + 여백(padding) */}
      <div className="max-w-3xl mx-auto p-6">
        {/* 페이지 제목 */}
        <h1 className="text-2xl font-bold mb-6">📋 게시글 목록</h1>

        {/* 게시글 목록 출력 */}
        {Array.isArray(posts) && posts.length > 0 ? (
          posts.map((post) => (
            // 각 게시글을 PostCard 컴포넌트로 렌더링
            // key는 React가 각 요소를 구분하는 데 필요
            <PostCard key={post.id} post={post} />
          ))
        ) : (
          <p className="text-gray-500">게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}

// BoardList 컴포넌트를 다른 파일에서 쓸 수 있도록 export
export default BoardList;
