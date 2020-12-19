const jwt = require("jsonwebtoken");

function generateAuthToken(user) {
  const token = jwt.sign(
    {
      _id: user._id,
      username: user.username,
      isOwner: username.isOwner,
      isAdmin: username.isAdmin,
    },
    config.get("jwtPrivateKey")
  );
  return token;
}

exports.generateAuthToken = generateAuthToken;
