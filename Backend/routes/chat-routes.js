const router = require('express').Router()
const controllers= require('./../controllers/index-controller')


router.get('/users',controllers.authController.verifyToken , controllers.chatsController.getAllUsers)
router.get('/self',controllers.authController.verifyToken, controllers.chatsController.getSpecificUser)
router.get('/messages/:userid',controllers.authController.verifyToken, controllers.chatsController.getAllMessages)


module.exports = router