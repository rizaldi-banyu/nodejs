const express = require("express");
const router = express.Router();
const {index, index1,edit_pengguna,ken } = require('../controllers/penggunaController');
const {user,add_user,add_user1,edit_user } = require("../controllers/userConttroller");


/* pengguna */
    // get all pengguna
    router.get('/', index);

    // insert pengguna on database
    router.post('/', index1);

    // edit pengguna
    router.get('/edit_pengguna/:id', edit_pengguna);

/* user */
    // get all user
    router.get('/user', user);

    // insert user on database
    router.post('/add_user',add_user);

    router.get('/add_user', add_user1);

    // edit user
    router.get('/edit_user/:id', edit_user);

/* kendaraan */
    // router.get('/count_kendaraan', count_kendaraan);

    router.get('/kendaraan', ken);

module.exports = router;