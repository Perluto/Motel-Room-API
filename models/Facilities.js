const mongoose = require('mongoose');

const FacilitiesSchema = new mongoose.Schema({
    ID:  {
        type: String
    },
    bathroom: {
        type: Number,
        require: true,
        min: 1,
        max: 10
    },
    kitchen: {
        type: Number,
        require: true,
        min: 1,
        max: 10
    },
    air_condition: {
        type: Boolean,
        require: true
    },
    balcony: {
        type: Boolean,
        require: true
    },
    electricity_price: {
        type: Number,
        require: true,
        min: 0
    },
    water_price: {
        type: Number,
        require: true,
        min: 0
    },
    other: {
        type: String
    }
});

module.exports = mongoose.model('Facilities', FacilitiesSchema);