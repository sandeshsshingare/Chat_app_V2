const express = require('express')
const router = express.Router();
const authRoutes = require('./auth-routes')
const chatRoutes = require('./chat-routes')



router.use('/auth',authRoutes)
router.use('/chat',chatRoutes)

module.exports =router