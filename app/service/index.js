const database = require('../common-config/database')

const MongoHelper = require('../helpers/mongo-helper')

const db = new MongoHelper({ database })

const UserService = require('./user-service')
const TaskService = require('./task-service')

const userService = new UserService({ db })
const taskService = new TaskService({ db })

module.exports = {
    userService,
    taskService
}