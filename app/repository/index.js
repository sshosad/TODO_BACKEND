 const LoginRepository = require('./login-repository')
const TaskRepository = require('./task-respository')

const errors = require('../helpers/customised-errors')

const {
    userService,
    taskService
} = require('../service')

const loginRepository = new LoginRepository({ userService, errors })
const taskRepository = new TaskRepository({ taskService, errors })

module.exports = {
    loginRepository,
    taskRepository
}