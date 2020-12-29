const mongoose = require("mongoose");

module.exports = function (id) {
  if (!mongoose.Types.ObjectId.isValid(id)) return false;

  return true;
};
