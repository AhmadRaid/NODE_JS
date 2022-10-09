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

    console.log(req.body)

    if(req.body.permissionCategory){

    req.body.permissionCategory.forEach(permission_ahmad => {

        const permission = new Permission({
            role_id : req.body.role_id,
            resource:'category',
            action: permission_ahmad,
            attributes:'*'
        });

    permission.save()
    .then(result => {
        res.redirect('/permission')
    })

    .catch(err => {
        console.error(err)
    })

})
      

}
if(req.body.permissionProduct){

    req.body.permissionProduct.forEach(permission_Product => {

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
            console.error(err)
        })
    
    })


}
if(req.body.permissionRole){

    req.body.permissionRole.forEach(permission_Role => {


        const permission = new Permission({
            role_id : req.body.role_id,
            resource:'role',
            action: permission_Role,
            attributes:'*'
        });
    
        permission.save()
        .then(result => {
            res.redirect('/permission')
        })
    
        .catch(err => {
            console.error(err)
        })
    
    })


}
if(req.body.permissionPermission){

    req.body.permissionPermission.forEach(permission_Permission => {


        const permission = new Permission({
            role : req.body.role,
            resource:'permission',
            action: permission_Permission,
            attributes:'*'
        });
    
        permission.save()
        .then(result => {
            res.redirect('/permission')
        })
    
        .catch(err => {
            console.error(err)
        })
    
    })



}
}

exports.updatePermission = async(req,res,next) => {

         await Permission.find({},{role : 1 , resource : 1 , action : 1 , attributes : 1 , _id : 0})
        .then(grant_ahmad => {

            let grantList = [
                { role: 'admin', resource: 'video', action: 'create:any', attributes: '*, !views' },
                { role: 'admin', resource: 'video', action: 'read:any', attributes: '*' },
                { role: 'admin', resource: 'video', action: 'update:any', attributes: '*, !views' },
                { role: 'admin', resource: 'video', action: 'delete:any', attributes: '*' },
             
                { role: 'user', resource: 'video', action: 'create:own', attributes: '*, !rating, !views' },
                { role: 'user', resource: 'video', action: 'read:any', attributes: '*' },
                { role: 'user', resource: 'video', action: 'update:own', attributes: '*, !rating, !views' },
                { role: 'user', resource: 'video', action: 'delete:own', attributes: '*' }
            ]

            console.log(grantList)
            console.log('/////////////////////')
            console.log(grant_ahmad)

            const test = grant_ahmad;

                const ac =  new AccessControl(grantList);

                console.log(test)
                // const permission = ac.can('admin').readAny('category');
                // if (permission.granted) {
                // console.log('Mohammed Salla Allah alihe wasalem')
                // } else {
                //     console.log('Try Again')
                // }

        })
        .catch(err => {
            console.log(err)

        });
   
}