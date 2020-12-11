const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    id_post_ref:    {
        type: String
    },
    id_user_ref:    {
        type: String
    },
    content: {
        type: String,
        require: true
    },
    Date_time: {
        type: Date,
        default: Date.now
    },
    is_comfirm: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Comment', CommentSchema);