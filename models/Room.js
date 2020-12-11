const mongoose = require('mongoose');

const RoomSchema = new mongoose.Schema({
    ID:  {
        type: String
    },
    id_address_ref:   {
        type: String,
        require: true
    },
    ID_user: {
        type: String,
        require: true
    },
    id_room_type_ref: {
        type: String,
        require: true
    },
    related_area: {
        type: String
    },
    price: {
        type: Number,
        require: true
    },
    area: {
        type: String,
        require: true
    },
    id_facilities: {
        type: String
    },
    image: {
        type: String,
        require: true
    },
    time: {
        type : String,
        require: true
    },
    id_status: {
        type: String,
        require: true 
    }
});

module.exports = mongoose.model('Rooms', RoomSchema);