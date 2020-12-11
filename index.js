const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const User = require("./models/User");
require('dotenv/config');
const port = 3000;

app.use(bodyParser.json());

//Import Routes
const postsRoute = require('./routes/posts');
const usersRoute = require('./routes/users');
app.use('/posts', postsRoute);
app.use('/users', usersRoute);

//Routes

app.get('/', (req, res) => {
  res.send('We are on me')
});

//Connect to DB
mongoose.connect(
    process.env.DB_CONNECTION,
    { useNewUrlParser: true }, 
    () =>  console.log('Connected to DB!')
);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
