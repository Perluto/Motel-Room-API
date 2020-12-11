const mongoose = require('mongoose');

const Room_TypeSchema = new mongoose.Schema({
    ID:  {
        type: String
    },
    Type:   {
        type: String
        //require: true
    }
});

module.exports = mongoose.model('Room_Type', Room_TypeSchema);