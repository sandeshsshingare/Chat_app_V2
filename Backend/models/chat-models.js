const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
        message:{
            type:String,
            required:[true, "message is required field"]
        },
        from:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user', 
            required:[true, "Sender user id is required field"],
        },
        to:{
            type: mongoose.Schema.Types.ObjectId,
            ref:'user',
            required:[true, "Receiver user id is required field"]
        }
},{timestamps : true,  suppressWarning: true})

const chatModel = mongoose.model('chat', chatSchema)

module.exports = chatModel
