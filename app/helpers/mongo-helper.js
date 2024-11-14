

class MongoHelper {
    constructor({ database }) {
        this.database = database.database
    }

    async insert(collectionName, object) {
        const collection = this.database.collection(collectionName)

        if(Array.isArray(object)) {
            return await collection.insertMany(object)
        }

        return await collection.insertOne(object)
    }

    async findOne(collectionName, query, projection, sort) {
        const collection = this.database.collection(collectionName)

        return await collection.findOne(query, projection, sort)
    }

    async find(collectionName, query, projection, sort, limit, skip) {
        const collection = this.database.collection(collectionName)

        return await collection.find(query, projection, sort, limit, skip)
    }

    async update(collectionName, query, updateObj, updateAll=false) {
        const collection = this.database.collection(collectionName)

        if(updateAll) {
            return await collection.updateMany(query, updateObj)
        }

        return collection.updateOne(query, updateObj)
    }
}

module.exports = MongoHelper