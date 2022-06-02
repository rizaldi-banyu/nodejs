const Pengguna = require('../models/pengguna');

const index = (req, res) => {
    Pengguna.find().exec((err, pengguna) =>{
        if (err) {
            res.json({ message: err.message});
        } else {

            res.render('index', {
                title: 'Home',
                pengguna: pengguna,
            })
        }
    });
}

const index1 = (req, res) => {
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
}

const edit_pengguna = (req,res) =>{
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
}

const ken = (req, res) => {
    Pengguna.find().exec((err, pengguna) =>{
        if (err) {
            res.json({ message: err.message});
        } else {
            Pengguna.aggregate([
                { $group : { _id : '$jenis_kendaraan', jenis_kendaraan : { $sum : 1 } } }
            ], function (err, ken) {
                    if (err) {
                        res.json({ message: err.message});
                    } else {
                        res.render('kendaraan', {
                            title: 'Daftar Kendaraan',
                            ken: ken,
                            pengguna: pengguna,
                        })
                    }
                
            });

        }
    });
}




module.exports =  {
    index,
    index1,
    edit_pengguna,
    ken
};