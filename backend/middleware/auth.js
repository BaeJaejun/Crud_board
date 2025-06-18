module.exports = (req, res, next) => {
  if (req.session.userId) return next();
  res.status(401).json({ message: "로그인 필요" });
};
