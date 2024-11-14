const { TAST_HISTORY_ACTIONS, DB_COLLECTIONS } = require("../helpers/constants")
const { convertToObjectId } = require("../helpers/utilities")

class TaskService {
    constructor({ db }) {
        this.db = db
    }

    async createTask({ title, description, status, userId }) {
        const obj = {
            title,
            description,
            status,
            user_id: convertToObjectId(userId),
            created_at: new Date(),
            deleted: false,
            history: [
                { 
                    action: TAST_HISTORY_ACTIONS.CREATED,
                    status: status,
                    action_at: new Date()
                }
            ]
        }

        return await this.db.insert(DB_COLLECTIONS.TASK, obj)
    }

    async updateTask({ taskId, title, description, status }) {
        const updateObj = {
            $set: {
                title, description, status
            },
            $push: {
                history: {
                    action: TAST_HISTORY_ACTIONS.UPDATED,
                    status,
                    action_at: new Date()
                }
            }
        }

        const query = { _id: convertToObjectId(taskId), user_id: convertToObjectId(taskId) }

        return await this.db.update(query, updateObj)
    }

    async fetchTaskById({ taskId, projection }) {
        projection = projection || { title: 1, description: 1, status: 1, user_id: 1 }
        
        const query = { _id: convertToObjectId(taskId), deleted: false }

        return await this.db.findOne(query)
    }

    async deleteTask({ taskId }) {
        const query = { _id: convertToObjectId(taskId), deleted: false }

        const updateObj = {
            $set: {
                deleted: true
            },
            $push: {
                action: TAST_HISTORY_ACTIONS.DELETED,
                action_at: new Date()
            }
        }

        return await this.db.update(query, updateObj)
    }

    async fetchTaskList({ search, sort = false, userId, projection }) {
        const query = { user_id: convertToObjectId(userId), deleted: false }

        if(search) {
            query.$or = [
                {title: { $reqex: '^'+search, $options: 'i' }},
                {description: { $reqex: '^'+search, $options: 'i' }}
            ]
        }

        if(sort) {
            sort = { _id: -1 }
        }

        projection = projection || { task: 1, description: 1, user_id: 1, status: 1 }

        return await this.db.find(DB_COLLECTIONS.TASK, query, projection, sort)
    }
}

module.exports = TaskService