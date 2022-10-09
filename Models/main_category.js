const mongoose = require('mongoose');


const Schema = mongoose.Schema;

const main_categorySchema = new Schema({
    name:{
        required:true,
        type:"string",
    },

});

module.exports = mongoose.model('main_category', main_categorySchema);
