class TaskRepository {
    constructor({ taskService, errors }) {
        this.taskService = taskService
        this.errors = errors
    }

    async createTask({ title, description, status, userId }) {
        const createdTask = await this.taskService.createTask({ title, description, status, userId })

        if(!createdTask || !createdTask.insertedId) {
            throw new this.errors.CustomisedError({ m: 'failed to created task' })
        }

        return { _id: createdTask.inserted, title, description, userId, status, createdAt: new Date() }
    }

    async editTask({ title, description, status, userId, taskId }) {
        const existingtask = await this.taskService.fetchTaskById({ taskId })

        if(!existingtask) {
            throw new this.errors.CustomisedError({ m: 'Requested task not found for edit' })
        }

        if(userId !== existingtask.user_id + '') {
            throw new this.errors.CustomisedError({ m: 'Un-authorised permisson restricted' })
        }

        const updatedTask = await this.taskService.updatedTask({ title, taskId, status, description })

        if(!updatedTask) {
            throw new this.errors.CustomisedError({ m: 'Something went wrong, pleae try agin later.' })
        }

        return { _id: taskId, userId, description, status, title }
    }

    async deleteTask({ taskId, userId }) {
        const existingtask = await this.taskService.fetchTaskById({ taskId })

        if(!existingtask) {
            throw new this.errors.CustomisedError({ m: 'Requested task not found for edit' })
        }

        if(userId !== existingtask.user_id + '') {
            throw new this.errors.CustomisedError({ m: 'Un-authorised permisson restricted' })
        }

        const updatedTask = await this.taskService.updatedTask({ title, taskId, status, description })

        if(!updatedTask) {
            throw new this.errors.CustomisedError({ m: 'Something went wrong, pleae try agin later.' })
        }

        return { _id: taskId, userId }
    }

    async fetchTaskDetails({ taskId, userId }) {
        const taskInfo = await this.taskService.fetchTaskById({ taskId, projection: { history: -1 } })

        if(!taskInfo) {
            throw new this.errors.CustomisedError({ m: 'Requested task not found' })
        }

        if(userId !== taskInfo.user_id + '') {
            throw new this.errors.CustomisedError({ m: 'Un-authorised permisson restricted' })
        }

        return taskInfo
    }

    async fetchTaskList({ search, userId, sort }) {
        const taskList = await this.taskService.fetchTaskList({ search, userId, sort })

        return { taskList }
    }
}

module.exports = TaskRepository