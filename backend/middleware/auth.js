const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("x-auth-token");

  if (!token) {
    return res
      .status(401)
      .json({
        errors: [
          {
            msg: "No token, authorization denied",
            location: "header: x-auth-token ",
          },
        ],
      });
  }

  try {
    jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
      if (error) {
        return res
          .status(401)
          .json({
            errors: [
              { msg: "Token is not valid", location: "header: x-auth-token " },
            ],
          });
      }

      req.user = decoded.user;
      next();
    });
  } catch (error) {
    res
      .status(500)
      .json({
        errors: [{ msg: "Server Error", location: "header: x-auth-token" }],
      });
  }
};
