const jwt = require("jsonwebtoken");

const signToken = (id, nickname) => {
  return jwt.sign(
    {
      id,
      nickname,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "60m",
      issuer: "토큰 발급자",
    }
  );
};

module.exports = {
  signToken,
};
