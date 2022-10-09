const Permission = require('../Models/permission')
const Role = require('../Models/role')


exports.index = (req,res,next) => {

    res.render('permission/index')

}

exports.create = (req,res,next) => {
    Role.find()
    .then(role => {
        res.render('permission/create',{
            roles:role
        })
    })
    .catch(err => {
        console.error(err)
    })

}

exports.store = (req,res,next) => {

    console.log(req.body.permission.Category)




    if(req.body.permission.Category){

        req.body.permission.Category.forEach(permission_Category => {

        const permission = new Permission({
            role_id : req.body.role_id,
            resource:'category',
            action: permission_Category,
            attributes:'*'
        });

            permission.save()
            .then(result => {
                res.redirect('/permission')
            })
            .catch(err => {
                console.error(err)
            })})
}
else if(req.body.permission.Product){

    req.body.permission.Product.forEach(permission_Product => {

    const permission = new Permission({
        role_id : req.body.role_id,
        resource:'product',
        action: permission_Product,
        attributes:'*'
    });
    
        permission.save()
        .then(result => {
            res.redirect('/permission')
        })
        .catch(err => {
            console.error(err)})

        })
}



// }else if(req.body.permissionProduct){

//     req.body.permissionProduct.forEach(permission_Product => {

//         const permission = new Permission({
//             role_id : req.body.role_id,
//             resource:'permission',
//             action: permission_Product,
//             attributes:'*'
//         });
    
//         permission.save()
//         .then(result => {
//             res.redirect('/permission')
//         })
    
//         .catch(err => {
//             console.error(err)
//         })
    
//     })


// }else if(req.body.permissionRole){

//     req.body.permissionRole.forEach(permission_Role => {


//         const permission = new Permission({
//             role_id : req.body.role_id,
//             resource:'permission',
//             action: permission_Role,
//             attributes:'*'
//         });
    
//         permission.save()
//         .then(result => {
//             res.redirect('/permission')
//         })
    
//         .catch(err => {
//             console.error(err)
//         })
    
//     })


// }else if(req.body.permissionPermission){

//     req.body.permissionPermission.forEach(permission_Permission => {


//         const permission = new Permission({
//             role_id : req.body.role_id,
//             resource:'permission',
//             action: permission_Permission,
//             attributes:'*'
//         });
    
//         permission.save()
//         .then(result => {
//             res.redirect('/permission')
//         })
    
//         .catch(err => {
//             console.error(err)
//         })
    
//     })



// }
}

exports.define_role = (req,res,next) => {

}