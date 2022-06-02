const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    jenis_kelamin: {
        type: String,
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
});
module.exports = mongoose.model('User', userSchema);