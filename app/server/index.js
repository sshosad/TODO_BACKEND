const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()

const routes = require('../routes')
const config = require('../common-config/configurations')

const PORT = config.port

const start = () => {

    app.use(bodyParser.json())

    app.use('',(req, res, next) => {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "X-Requested-With, content-type");
        next()
    })

    app.use('', (req, res, next) => {
        console.log(req.url);
        next()
    })
    app.use('/api', routes)

    app.use('*', (req, res) => {
        res.status(404)
        res.send({ message: 'Route not found' })
    })

    app.listen(PORT, () => {
        console.log('App is running on port ', PORT)
    })
}

module.exports = {
    start
}