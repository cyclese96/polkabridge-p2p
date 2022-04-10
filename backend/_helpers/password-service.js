const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const generatePasswordHash = async (password) => {
  const salt = await bcrypt.genSalt(10);

  const passwordHash = await bcrypt.hash(password, salt);

  return passwordHash;
};

const verifyPasswordHash = async (password, passwordHash) => {
  const isMatch = await bcrypt.compare(password, passwordHash);
  return isMatch;
};

const getToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "5 days",
  });

  return token;
};

module.exports = { generatePasswordHash, verifyPasswordHash, getToken };
