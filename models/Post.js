const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    ID: {
        type: String
    },
    ID_room_ref:{
        type: String
    },
    is_Comfirm: {
        type: Boolean,
        default: false
    },
    view: {
        type: Number,
        require: true
    },
    like: {
        type: Number,
        require: true
    },
    is_comfirm: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Posts', PostSchema);