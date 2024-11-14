const { TASK_STATUS } = require("../helpers/constants")
const { handleError } = require("../helpers/utilities")

class TaskController {
    constructor({ taskRepository, errors }) {
        this.taskRepository = taskRepository
        this.errors = errors

        this.creteTask = this.creteTask.bind(this)
        this.editTask = this.editTask.bind(this)
        this.fetchTaskDetails = this.fetchTaskDetails.bind(this)
        this.fetchTaskList = this.fetchTaskList.bind(this)
        this.deleteTask = this.deleteTask.bind(this)
    }

    async creteTask(req, res) {
        try {
            const { title, description, userId, status } = req.body

            if(!title) {
                throw new this.errors.CustomisedError({ m: 'Task title is required', c: 501 })
            }

            if(![TASK_STATUS.COMPLETED, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TODO].includes(status)) {
                throw new this.errors.CustomisedError({ m: 'Invalid status passed', c: 501 })
            }

            if(!userId) {
                throw new this.errors.CustomisedError({ m: 'User id is required', c: 501 })
            }

            const response = await this.taskRepository.createTask({ title, description, userId, status })

            return res.send({ status: 'success', ...response })
        } catch(err) {
            return handleError(err, req, res)
        }
    }

    async editTask(req, res) {
        try {
            const { title, description, status, userId, taskId } = req.body

            if(!taskId) {
                throw new this.errors.CustomisedError({ m: 'Task id is required', c: 501 })
            }

            if(!title) {
                throw new this.errors.CustomisedError({ m: 'Task title is required', c: 501 })
            }

            if(!userId) {
                throw new this.errors.CustomisedError({ m: 'User id is required', c: 501 })
            }

            if(![TASK_STATUS.COMPLETED, TASK_STATUS.IN_PROGRESS, TASK_STATUS.TODO].includes(status)) {
                throw new this.errors.CustomisedError({ m: 'Invalid status passed', c: 501 })
            }

            const response = await this.taskRepository.editTask({ title, description, userId, status, taskId })

            return res.send({ status: 'success', ...response })
        } catch(err) {
            return handleError(err, req, res)
        }
    }

    async deleteTask(req, res) {
        try {
            const { taskId, userId } = req.body

            if(!taskId) {
                throw new this.errors.CustomisedError({ m: 'Task id is required', c: 501 })
            }

            if(!userId) {
                throw new this.errors.CustomisedError({ m: 'User id is required', c: 501 })
            }

            const response = await this.taskRepository.deleteTask({  userId, taskId })

            return res.send({ status: 'success', ...response })
        } catch(err) {
            return this.handleError(err, req, res)
        }
    }

    async fetchTaskDetails(req, res) {
        try {
            const { taskId, userId } = req.query

            if(!taskId) {
                throw new this.errors.CustomisedError({ m: 'Task id is required', c: 501 })
            }

            if(!userId) {
                throw new this.errors.CustomisedError({ m: 'User id is required', c: 501 })
            }

            const response = await this.taskRepository.fetchTaskDetails({  userId, taskId })

            return res.send({ status: 'success', ...response })
        } catch(err) {
            return this.handleError(err, req, res)
        }
    }

    async fetchTaskList(req, res) {
        try {
            const { taskId, userId } = req.body
            if(!taskId) {
                throw new this.errors.CustomisedError({ m: 'Task id is required', c: 501 })
            }

            if(!userId) {
                throw new this.errors.CustomisedError({ m: 'User id is required', c: 501 })
            }

            const response = await this.taskRepository.fetchTaskDetails({  userId, taskId })

            return res.send({ status: 'success', ...response })
        } catch(err) {
            return this.handleError(err, req, res)
        }
    }
}

module.exports = TaskController