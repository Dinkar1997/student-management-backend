const jwt = require("jsonwebtoken");

const generateToken = (user) => {
  const secret = (process.env.JWT_SECRET || "").trim();
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    secret,
    {
      expiresIn: (process.env.JWT_EXPIRES_IN || "30m").trim(),
    }
  );
};

const verifyToken = (token) => {
  const secret = (process.env.JWT_SECRET || "").trim();
  return jwt.verify(token, secret);
};

module.exports = {
    generateToken,
    verifyToken
};