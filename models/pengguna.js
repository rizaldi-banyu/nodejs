const mongoose = require('mongoose');
const penggunaSchema = new mongoose.Schema({
    merk_kendaraan: {
        type: String,
        required: true
    },
    plat_nomor: {
        type: String,
        required: true
    },
    jenis_kendaraan: {
        type: String,
        required: true
    },
    created: {
        type: Date,
        required: true,
        default: Date.now
    },
});
module.exports = mongoose.model('Pengguna', penggunaSchema);