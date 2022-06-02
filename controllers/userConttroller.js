const User = require('../models/users');

const user = (req,res) => {
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
}

const add_user = (req,res,next) => {

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
}

const add_user1 = (req,res) => {
    res.render("user/add_user", { title: "Add User"});
}

const edit_user = (req,res) =>{
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
}

module.exports =  {
    user,
    add_user,
    add_user1,
    edit_user
};