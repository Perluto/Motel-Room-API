const mongoose = require('mongoose');

const AddressSchema = new mongoose.Schema({
    ID:  {
        type: String
    },
    number:   {
        type: Number,
        require: true
    },
    road: {
        type: String,
        require: true
    },
    communes: {
        type: String,
        require: true
    },
    district: {
        type: String,
        require: true
    },
    city: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('Address', AddressSchema);