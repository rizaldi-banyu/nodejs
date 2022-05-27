const express = require("express");
const router = express.Router();
const User = require('../models/users');
const Pengguna = require('../models/pengguna');

/* pengguna */
    // get all pengguna
    router.get('/', (req,res) => {
        Pengguna.find().exec((err, pengguna) =>{
            if (err) {
                res.json({ message: err.message});
            } else {
                res.render('index', {
                    title: 'Home',
                    pengguna: pengguna
                })
            }
        });

    });

    // insert pengguna on database
    router.post('/', (req,res) => {
        Pengguna.init()

        const pengguna = new Pengguna({
            merk_kendaraan: req.body.merk_kendaraan,
            plat_nomor: req.body.plat_nomor,
            jenis_kendaraan: req.body.jenis_kendaraan,
        });
        pengguna.save((err) => {
            if(err){
                res.json({message: err.message, type: 'danger'});
            }else{
                req.session.message = {
                    type: 'success',
                    message: 'Pengguna added sucessfull'
                }
                res.redirect('/');
            }
        });
    });

    router.get('/kendaraan',(req,res) =>{
        // Pengguna.countDocuments({ jenis_kendaraan: 'motor'}, function (err, motor) {
        //     if (err) {
        //         res.json({ message: err.message});
        //     } else {
        //         res.render('kendaraan', {
        //             title: 'Home',
        //             motor: motor
        //         })
        //     }
        // });
        Pengguna.aggregate([
            { $group : { _id : '$jenis_kendaraan', jenis_kendaraan : { $sum : 1 } } }
        ], function (err, ken) {
                if (err) {
                    res.json({ message: err.message});
                } else {
                    res.render('kendaraan', {
                        title: 'Home',
                        ken: ken
                    })
                }
            
        });
    });


    // edit pengguna
    router.get('/edit_pengguna/:id',(req,res) =>{
        let id = req.params.id;
        Pengguna.findById(id, (err, pengguna) =>{
            if (err) {
                res.redirect('/')
            } else {
                if (pengguna == null) {
                    res.redirect('/')
                } else {
                    res.render('edit_pengguna', {
                        title: "Edit Kendaraan",
                        pengguna: pengguna,
                    });
                }
            }
        });
    });




/* user */
    // get all user
    router.get('/user', (req,res) => {
        User.find().exec((err, users) =>{
            if (err) {
                res.json({ message: err.message});
            } else {
                res.render('user/master', {
                    title: 'Users',
                    users: users
                })
            }
        });
    });

    // insert user on database
    router.post('/add_user',(req,res,next) => {

        User.init()

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
        });
        user.save((err) => {
            if(err){
                res.json({message: err.message, type: 'danger'});
            }else{
                req.session.message = {
                    type: 'success',
                    message: 'User added sucessfull'
                }
                res.redirect('/user');
            }
        });
    });

    router.get('/add_user', (req,res) => {
        res.render("user/add_user", { title: "Add User"});
    });

    // edit user
    router.get('/edit_user/:id',(req,res) =>{
        let id = req.params.id;
        User.findById(id, (err, user) =>{
            if (err) {
                res.redirect('/user')
            } else {
                if (user == null) {
                    res.redirect('/user')
                } else {
                    res.render('user/edit_user', {
                        title: "Edit User",
                        user: user,
                    });
                }
            }
        });
    });

router.get('/kendaraan', (req,res) => {
    res.render("kendaraan", { title: "Daftar Kendaraan"});
});

module.exports = router;