const mongoose = require("mongoose");
const config = require("config");
class DB {
  constructor() {
    this.url = config.get("db");
  }

  connect() {
    mongoose
      .connect(this.url, { useNewUrlParser: true })
      .then(() => console.log("Connected!"));
  }

  disconnect() {
    mongoose.disconnect().then(() => console.log("Disconnected!"));
  }
}

module.exports = DB;
