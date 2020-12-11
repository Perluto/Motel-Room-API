const mongoose = require('mongoose');

const RoleSchema = new mongoose.Schema({
    id_ref:{
        type: String
    },
    isAdmin: {
        type: Boolean,
        require:true 
    },
    isOwner: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('Role', RoleSchema);