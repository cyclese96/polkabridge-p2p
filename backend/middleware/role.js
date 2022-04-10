module.exports = (role) => {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next();
    }
    console.log(req.user.role);
    res.status(404).send({ message: "Access denied, Unauthorized user" });
  };
};
