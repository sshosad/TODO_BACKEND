const { MongoClient } = require('mongodb')

const config = require('./configurations')

const client = new MongoClient(config.db_url, { serverSelectionTimeoutMS: 100000 })

client.connect()
client.addListener('connectionCreated', (e) => {
    console.log(`DB connected to ${config.db_name} at ${e.time}`)
})

const database = client.db(config.db_name)

module.exports = { database }
