const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    ID:{
        type: String
    },
    username: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 50
    },
    password: {
        type: String,
        require: true,
        minlength: 5,
        maxlength: 20
    }
});

module.exports = mongoose.model('Users', UserSchema);