const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
        name:{
            type:String,
            required:[true, "User name is required field"]
        },
        email:{
            type:String, 
            required:[true, "User email is required field"],
            unique:[true, "This mail is already registered"]
        },
        password:{
            type:String,
            required:[true, "User password is required field"]
        }
},{timestamps : true})

const userModel = mongoose.model('user', userSchema)

module.exports = userModel
