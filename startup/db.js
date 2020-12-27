const mongoose = require("mongoose");
const config = require("config");
const mongooseOpts = {
  useNewUrlParser: true,
  autoReconnect: true,
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000,
  poolSize: 10,
};
class DB {
  constructor() {
    this.url = config.get("db");
  }

  connect() {
    mongoose
      .connect(this.url, mongooseOpts)
      .then(() => console.log("Connected!"));
  }

  disconnect() {
    mongoose.disconnect().then(() => console.log("Disconnected!"));
  }
}

module.exports = DB;
