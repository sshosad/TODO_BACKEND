const express = require('express')

const router = express.Router()

const login = require('./login-route')
const task = require('./task-route')

router.use('/auth', login)
router.use('/task', task)

module.exports = router