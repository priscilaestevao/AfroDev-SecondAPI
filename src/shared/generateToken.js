const jwt = require("jsonwebtoken");
const crypto = require("crypto");

function createToken(user) {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "10m" });
};

module.exports = createToken;
