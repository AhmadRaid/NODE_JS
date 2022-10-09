const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema({

    role:{
        type:"string",
		//type: mongoose.Schema.Types.ObjectId,
       //required:false  ref:'role'
    },
    resource:{
        type:"string",
    },
    action:{
        type:"string",
    },
    attributes:{
        type:"string",
    }
});

module.exports = mongoose.model('permission',permissionSchema)