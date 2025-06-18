const Post = require("../models/Post");

// 전체 게시글 조회
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // 최신순 정렬
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "게시글 조회 실패", error: err.message });
  }
};

// 게시글 작성
exports.createPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({ title, content, author });
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(500).json({ message: "게시글 작성 실패", error: err.message });
  }
};

// 게시글 상세 조회
exports.getPostById = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: "게시글 조회 실패", error: err.message });
  }
};

// 게시글 삭제
exports.deletePost = async (req, res) => {
  const { id } = req.params;

  try {
    await Post.findByIdAndDelete(id);
    res.status(204).send(); // No Content
  } catch (err) {
    res.status(500).json({ error: "게시글 삭제 실패" });
  }
};

// 댓글 추가
exports.addComment = async (req, res) => {
  const { id } = req.params; // 게시글 ID
  const { author, content } = req.body;

  try {
    const post = await Post.findById(id);
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    const newComment = { author, content, createdAt: new Date() };
    post.comments.push(newComment);
    await post.save();

    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ message: "댓글 등록 실패", error: err.message });
  }
};

// 댓글 삭제
exports.deleteComment = async (req, res) => {
  const { id: postId, commentId } = req.params;

  try {
    const post = await Post.findById(postId);
    if (!post)
      return res.status(404).json({ message: "게시글을 찾을 수 없습니다." });

    // 댓글 필터링
    const originalCount = post.comments.length;
    post.comments = post.comments.filter((c) => c._id.toString() !== commentId);

    if (post.comments.length === originalCount) {
      return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
    }

    await post.save();
    res.status(204).send(); // No Content
  } catch (err) {
    console.error("댓글 삭제 실패:", err);
    res.status(500).json({ message: "댓글 삭제 실패" });
  }
};
