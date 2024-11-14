const express = require('express')

const router = express.Router()

const loginController = require('../controller').loginController

router.post('/signup', loginController.signUp)
router.post('', loginController.login)

module.exports = router