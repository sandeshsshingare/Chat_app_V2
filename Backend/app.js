const express = require('express')
const dotenv = require('dotenv')
dotenv.config({path:'./config.env'})
const dbConnect = require('./db-connect')
const indexRoutes = require('./routes/index-routes')
const cors = require('cors')
const app = express();
const controllers = require('./controllers/index-controller')
const CustomError = require('./utils/custom-error')
app.use(express.json())
app.use(cors())

app.use("/",indexRoutes)

app.all("*",(req,res,next)=>{
    const error = new CustomError(`The URL ${req.originalUrl} is not found!!!`, 404)
    next(error)
})
app.use(controllers.errorController)
const server = require('http').createServer(app)
const io = require('socket.io')(server)

io.on('connection',()=>{
    console.log('socket io connceted')
})
server.listen(process.env.PORT, ()=>{
    console.log('server is running on ' + process.env.PORT)
})