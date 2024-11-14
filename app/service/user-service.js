const { DB_COLLECTIONS } = require("../helpers/constants")
const { convertToObjectId } = require("../helpers/utilities")

class UserService {
    constructor({ db }) {
        this.db = db
    }

    async createuser({ firstName, lastName, email, password }) {
        const userObj = {
            first_name: firstName,
            last_name: lastName,
            email_id: email,
            password: password,
            created_at: new Date()
        }

        return await this.db.insert(DB_COLLECTIONS.USER, userObj)
    }

    async fetchUserInfoByUserId({ userId, projection }) {
        const query = { _id: convertToObjectId(userId) }

        projection = projection || { first_name: 1, last_name, email_id: 1 }

        return await this.db.findOne(DB_COLLECTIONS.USER, query, projection)
    }

    async fetchUserInfoByEmailId({ emailId, projection }) {
        const query = { email_id: emailId }

        projection = projection || { first_name: 1, last_name, email_id: 1 }
        
        return await this.db.findOne(DB_COLLECTIONS.USER, query, projection)
    }
}

module.exports = UserService