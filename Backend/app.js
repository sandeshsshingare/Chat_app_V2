const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const dbConnect = require('./db-connect')
const indexRoutes = require('./routes/index-routes')
const cors = require('cors')
const app = express();
const controllers = require('./controllers/index-controller')
const models = require('./models/index-models')
const CustomError = require('./utils/custom-error')
app.use(cors())
app.use(express.json())


app.use("/",indexRoutes)


app.all("*",(req,res,next)=>{
    const error = new CustomError(`The URL ${req.originalUrl} is not found!!!`, 404)
    next(error)
})
app.use(controllers.errorController)
const server = require('http').createServer(app)

//socket connection....
const IO = require('socket.io')(server,{
    cors:{
        origin:process.env.SOCKET_CONN_URL,
        methods:["*"]
    }
})

IO.on('connection',(socket)=>{
    console.log('socket io connceted')
    socket.on('sendMessage',controllers.chatsController.sendMessage)
})

models.ChatModel.watch().on('change',(next)=>{
    console.log(next)
    IO.emit("returning-add-message", next.fullDocument)
})





server.listen(process.env.PORT, ()=>{
    console.log('server is running on ' + process.env.PORT)
})