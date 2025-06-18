// src/pages/PostDetail.jsx
// 게시글 상세 내용을 보여주는 페이지 컴포넌트
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import CommentBox from "../components/CommentBox";
import { fetchPostById, addCommentToPost } from "../api/api";
import { deletePost } from "../api/api";
import { deleteComment } from "../api/api";

function PostDetail() {
  const { id } = useParams(); // URL에서 post ID 추출
  const [post, setPost] = useState(null); // 게시글 내용
  const [commentList, setCommentList] = useState([]);
  const navigate = useNavigate();

  // 게시글 불러오기
  useEffect(() => {
    fetchPostById(id)
      .then((res) => {
        setPost(res.data);
        setCommentList(res.data.comments || []);
      })
      .catch((err) => {
        console.error("게시글 조회 실패:", err);
      });
  }, [id]);

  // 해당 ID의 게시글이 없는 경우
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  //댓글 등록 처리 함수
  const handleAddComment = async ({ author, content }) => {
    try {
      const res = await addCommentToPost(id, { author, content });

      // 서버에서 등록된 댓글 반환한다고 가정 (id 포함)
      const newComment = res.data;

      // 로컬 상태 업데이트
      setCommentList([...commentList, newComment]);
    } catch (err) {
      console.error("댓글 등록 실패:", err);
      alert("댓글 등록에 실패했습니다.");
    }
  };

  const handleDeletePost = async () => {
    if (!window.confirm("정말 삭제하시겠습니까?")) return;
    try {
      await deletePost(id);
      alert("삭제 완료!");
      navigate("/"); // 홈으로 이동
    } catch (err) {
      console.error("삭제 실패:", err);
      alert("게시글 삭제에 실패했습니다.");
    }
  };

  const handleDeleteComment = async (commentId) => {
    if (!window.confirm("댓글을 정말 삭제하시겠습니까?")) return;
    try {
      await deleteComment(id, commentId);
      // 로컬 상태에서 해당 댓글 제거
      setCommentList(commentList.filter((c) => c._id !== commentId));
    } catch (err) {
      console.error("댓글 삭제 실패:", err);
      alert("댓글 삭제에 실패했습니다.");
    }
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
        <span className="text-gray-500 text-sm mb-4">
          작성자: {post.author} | {post.date} | 💬 댓글 {commentList.length}개
        </span>
        {/* 삭제 버튼 */}
        {post.author === localStorage.getItem("username") && (
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:underline ml-4"
          >
            게시글 삭제
          </button>
        )}
        {/* 게시글 본문 */}
        <hr className="my-6" />

        <p className="text-gray-800 leading-relaxed">{post.content}</p>

        {/* 댓글 구역 */}
        <hr className="my-6" />
        <h3 className="text-lg font-semibold mb-2">
          💬 댓글 ({commentList.length})
        </h3>

        {/* 댓글 목록 */}
        <ul className="space-y-2 mb-4">
          {commentList.map((c) => (
            <li key={c._id} className="p-2 flex justify-between items-start">
              <div>
                <span className="font-medium">{c.author} :</span> {c.content}
              </div>
              {/* localStorage의 currentUser와 댓글의 author가 같을 때만 삭제 버튼 표시 */}
              {c.author === localStorage.getItem("username") && (
                <button
                  onClick={() => handleDeleteComment(c._id)}
                  className="text-red-500 hover:underline ml-4"
                >
                  삭제
                </button>
              )}
            </li>
          ))}
        </ul>

        {/* 댓글 입력 컴포넌트 사용 */}
        <CommentBox
          onSubmit={handleAddComment}
          author={localStorage.getItem("username")}
        />
      </div>
    </div>
  );
}

export default PostDetail;
