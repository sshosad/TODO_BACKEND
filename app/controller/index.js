const LoginController = require('./login-controller')
const TaskController = require('./task-controller')

const errors = require('../helpers/customised-errors')

const {
    loginRepository, 
    taskRepository
} = require('../repository')

const loginController = new LoginController({  loginRepository, errors })
const taskController = new TaskController({ taskRepository, errors })

module.exports = {
    loginController,
    taskController
}