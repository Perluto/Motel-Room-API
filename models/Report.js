const mongoose = require('mongoose');

const ReportSchema = new mongoose.Schema({
    id_user_ref: {
        type: String
    },
    id_post_ref:{
        type: String
    },
    reason: {
        type: String,
        require: true
    },
    is_comfirm: {
        type: Boolean,
        default: false
    }
});

module.exports = mongoose.model('Report', ReportSchema);