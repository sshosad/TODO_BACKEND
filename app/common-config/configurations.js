const dotEnv = require('dotenv')

dotEnv.config()

const env = process.env

function configurations() {
    return {
        port: env.PORT,
        db_url: env.DATABASE_URL,
        db_name: env.DATABASE_NAME
    }
}

module.exports = configurations()

