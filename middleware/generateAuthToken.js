const jwt = require("jsonwebtoken");
const config = require("config");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      isOwner: user.isOwner,
      isAdmin: user.isAdmin,
      isConfirm: user.isConfirm,
    },
    config.get("jwtPrivateKey")
  );
  return token;
}

exports.generateAuthToken = generateAuthToken;
