const mongoose = require('mongoose');
const passportLocalMongoose = require("passport-local-mongoose");
const bcrypt = require('bcrypt-nodejs');


const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        required:true,
        type:"string",
    },
    password:{
        required:true,
        type:"string",
    },
     role:{
        required:true,
        type:"string",
    },


});

// generating a hash
// passwords are not saved to the database as is. Instead, they are hashed first, then saved.
// hashes are always the same for the same password given the same "salt".
userSchema.statics.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
// this method takes the password, hashes it, and compares it to the user's own password
// when the two hashes are equal, it means the passwords match
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
};


userSchema.methods.isMember = function() {
    return (this.role === "member");
};
userSchema.methods.isAuthor = function() {
    return (this.role === "author");
};

module.exports = mongoose.model('User', userSchema);
