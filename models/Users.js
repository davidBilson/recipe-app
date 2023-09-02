const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
     username: {
        type: String,
        required: true,
        unique: true //to prevent same username from being written to o database=
     },
     password: {
        type: String,
        required: true,
     }
})

const UserModel = mongoose.model('user', UserSchema)

module.exports = UserModel;