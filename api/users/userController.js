const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const User = require("./User");

function createToken(user) {
  const payload = {
    id: user.id,
  };
  return jwt.sign(payload, process.env.JWT_KEY);
};

module.exports = {
    login: (req, res) => {
        const acessToken = createToken(req.user);
        res.set("Authorization", acessToken);
        res.status(200).send();
    }
};
