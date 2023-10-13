const asyncErrorHandler = require('./../utils/async-error-handler')
const models = require('./../models/index-models')
var mongoose  = require('mongoose')
const sendMessage = async(msgObj)=>{
    const {message, from ,to} = msgObj.message 
    let obj = JSON.parse (JSON.stringify(msgObj.message))
    let chatData = await models.ChatModel.create(obj)
    await models.UserModel.updateOne({_id:msgObj.message.from}, {$push :{messages :
        {message: chatData._id, to: msgObj.message.to , from : msgObj.message.from}
    
    }})
    await models.UserModel.updateOne({_id:msgObj.message.to}, {$push :{messages :
        {message: chatData._id, to: msgObj.message.to , from : msgObj.message.from}
    
    }})



}

const getAllMessages = async(req,res,next)=>{
    let user = await models.UserModel.find({})
    console.log('user')
    console.log(req.params.userid)
        // console
        const chatsData = await models.UserModel.aggregate([
            {
              $match: {
                          _id: {
                            $in: [    
                         new mongoose.Types. ObjectId(req.tokenObj.id),
                          
                            ],
                          },
                        },
                      },
                      {
                        $unwind: {
                          path: "$messages",
                        },
                      },
                      {
                        $lookup: {
                          from: "chats",
                          localField: "messages.message",
                          foreignField: "_id",
                          as: "result",
                        },
                      },
                      {
                        $match : {
                          
                            
                             "$or":[{"messages.to" : new mongoose.Types. ObjectId(req.params.userid)},
                             {"messages.from" : new mongoose.Types. ObjectId(req.params.userid)},
                          
                              ]
                          },
                           
                          
                          
                        },
                      
                      {
                        $unwind: {
                          path: "$result",
                        },
                      },
                    {
                    $project  : {
                         result:1
                      }
                    },
                    {
                      $group : {
                        _id : null,
                        messages  : {$push : "$result"}
                      }
                    }
                      
                     
                    ])
          console.log(chatsData)
    res.status(200).json({
        status:'success',
        results:chatsData
    })
}

const getSpecificUser =asyncErrorHandler(async (req,res,next)=>{
    const userId = req.tokenObj.id
    const userData = await models.UserModel.findById(userId)

    res.status(200).json({
        status:"success",
        results:userData
    })
})

const getAllUsers = asyncErrorHandler(async (req,res,next)=>
{
    const userList = await models.UserModel.find({})
    res.status(200).json({
        status:'success',
        results:userList
    })
})


module.exports = {sendMessage, getSpecificUser, getAllUsers,getAllMessages}