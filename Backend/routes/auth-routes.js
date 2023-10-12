const router = require('express').Router()
const controllers= require('./../controllers/index-controller')

router.post('/login', controllers.authController.login )
router.post('/register', controllers.authController.register)

module.exports = router