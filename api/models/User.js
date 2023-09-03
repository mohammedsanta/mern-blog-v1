const mongoose = require('mongoose');
const { Schema,model } = mongoose;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    username: {type: String, required: true, min: 4, unique: true},
    password: {type: String, required: true}
})

UserSchema.pre('save', function (next) {

    if(this.isNew) {
        // Hashing Password
        bcrypt.hash(this.password,10,(err,passwordHashed) => {
            // Replacing The clean text password to hash password
            this.password = passwordHashed;
            // next
            next();
        })
    } else {
        next()
    }

});

const UserModel = model('User',UserSchema);

module.exports = UserModel;