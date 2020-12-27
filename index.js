const express = require("express");
const config = require("config");
const app = express();
const port = process.env.PORT || config.get("port");
const address = require("./routes/address");
const room = require("./routes/room");
const post = require("./routes/post");
const user = require("./routes/user");
const auth = require("./routes/auth");
const Joi = require("joi");

Joi.objectId = require("joi-objectid")(Joi);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require("./startup/cors")(app);
app.use("/api/address", address);
app.use("/api/room", room);
app.use("/api/post", post);
app.use("/api/user", user);
app.use("/api/auth", auth);
require("./startup/db")();

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
