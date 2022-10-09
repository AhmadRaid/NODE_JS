const Permission = require('../Models/permission')

const checkPermission =  (permission) => {
    return (request, response, next) => {

	Permission.find({role: 'admin'})
	.then(data =>{
		//console.log(data)
        for(var i = 0; i < data.length; i++) {
            if (data[i].action == permission) {
                console.log('true')
                break;
            }
            next('Authentication True')
}
	})
	.catch(err => {
		console.log(err)
		next('Authentication Error')
	})

}
}

module.exports = checkPermission;