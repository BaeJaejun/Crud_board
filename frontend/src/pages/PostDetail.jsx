// src/pages/PostDetail.jsx
// 게시글 상세 내용을 보여주는 페이지 컴포넌트

import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CommentBox from "../components/CommentBox";

function PostDetail({ posts }) {
  const { id } = useParams(); // URL에서 post ID 추출

  // posts 배열에서 현재 id에 해당하는 게시글 찾기
  const post = posts.find((p) => String(p.id) === id);

  // 댓글 상태 로컬에서 별도로 관리 (초기값: 게시글의 comments 배열)
  const [commentList, setCommentList] = useState(post?.comments || []);

  // 해당 ID의 게시글이 없는 경우
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  //댓글 등록 처리 함수
  const handleAddComment = ({ author, content }) => {
    const newComment = {
      id: commentList.length + 1, // 임시 ID
      author,
      content,
    };

    // 댓글 목록에 추가
    setCommentList([...commentList, newComment]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 공통 헤더 */}
      <Header />
      {/* 게시글 제목 */}

      <div className="max-w-2xl mx-auto p-6 bg-white shadow mt-10 rounded">
        {/* 게시글 제목 */}
        <h1 className="text-2xl font-bold mb-2">{post.title}</h1>

        {/* 작성자 및 작성일 */}
        <div className="text-gray-500 text-sm mb-4">
          작성자: {post.author} | {post.date} | 💬 댓글 {commentList.length}개
        </div>

        {/* 게시글 본문 */}
        <p className="text-gray-800 leading-relaxed">{post.content}</p>

        {/* 댓글 구역 */}
        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-2">
          💬 댓글 ({commentList.length})
        </h3>

        {/* 댓글 목록 */}
        <ul className="space-y-2 mb-4">
          {commentList.map((c) => (
            <li key={c.id} className="p-2">
              <span className="font-medium">{c.author}:</span> {c.content}
              <hr className="border-gray-200" />
            </li>
          ))}
        </ul>

        {/* 댓글 입력 컴포넌트 사용 */}
        <CommentBox onSubmit={handleAddComment} />
      </div>
    </div>
  );
}

export default PostDetail;
