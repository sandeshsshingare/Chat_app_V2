const models = require('./../models/index-models')
const asyncErrorHandler = require('./../utils/async-error-handler')
const jwt = require('jsonwebtoken')
const CustomError  = require('./../utils/custom-error')
const util = require('util')

const singToken = (id)=>{
   let token=  jwt.sign({id},process.env.JWT_SECRET_KEY,{expiresIn:"10h"})
   return token
}

const verifyToken = asyncErrorHandler(async (req,res,next)=>{
    const rawToken = req.query.token || req.headers.authorization
    let token1;
    if(!req.query.token){
        if(rawToken && rawToken.startsWith('Bearer')){
            token1 = rawToken.split(' ')[1]
        }
        if(!token1 ){
            const error =new CustomError("Please provide token", 400)
            next(error)
        }
    }
    else{
        token1 = rawToken
    }
    let tokenObj = await util.promisify(jwt.verify)(token1, process.env.JWT_SECRET_KEY)

    req.tokenObj= tokenObj


    next();
})


const login =asyncErrorHandler(async (req,res,next)=>{
    const {email,password}  = req.body

    const userData = await models.UserModel.findOne({email, password})
   
    const token =  singToken (userData._id)
    res.status(200).json({
        status:"success",
        results:userData,
        token : token
    })
})

const register =asyncErrorHandler(async (req,res,next)=>{
    const {email,name,password} = req.body

    const registeredUser =await models.UserModel.create({email,name,password})
    const token = singToken(registeredUser._id)
    res.status(200).json({
        status:'success',
        results: registeredUser,
        token :token
    })
})


module.exports = {login, register,verifyToken}