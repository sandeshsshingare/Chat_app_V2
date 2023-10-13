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
        },
        messages : [{ message:{ type: mongoose.Schema.Types.ObjectId  , ref:'chat'},
         to:{type:mongoose.Schema.Types.ObjectId , ref:'user'},
         from :{type:mongoose.Schema.Types.ObjectId , ref:'user'}
        }]
},{timestamps : true, suppressWarning: true})

const UserModel = mongoose.model('user', userSchema)

module.exports = UserModel
