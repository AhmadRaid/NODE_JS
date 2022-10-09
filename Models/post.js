const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    Title:{
        required:true,
        type:"string",
    },
    description:{
        required:true,
        type:"string",
    },
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
});

module.exports = mongoose.model('Post', postSchema);
