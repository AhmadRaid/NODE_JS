const mongoose = require('mongoose');

const roleSchema = new mongoose.Schema({

    name:{
        required:true,
        type:"string",
    }

});

module.exports = mongoose.model('role',roleSchema)