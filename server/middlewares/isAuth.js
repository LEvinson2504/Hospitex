const isAuth = (req, res, next) => {
  if (!req.session.userId) throw new Error("Not authenticated");
  return next();
};
module.exports = isAuth;
