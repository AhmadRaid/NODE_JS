const Permission = require('../Models/permission')
const Role = require('../Models/role')


exports.index = (req,res,next) => {

    res.render('role/index')

}

exports.create = (req,res,next) => {

    res.render('role/create')

}

exports.store = (req,res,next) => {

    const role = new Role({
        name: req.body.role_name
    });

    role.save()
    .then(result => {
        res.redirect('/role')
    })

    .catch(err => {
        console.error(err)
    })
    
}