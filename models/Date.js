const mongoose = require('mongoose');

const DateSchema = new mongoose.Schema({
    id_post:  {
        type: String
    },
    renewal_date: {
        type: Date,
        require: true
    },
    due_date:   {
        type: Date,
        require: true
    }
});

module.exports = mongoose.model('Date', DateSchema);