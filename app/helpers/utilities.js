const { CustomisedError } = require('./customised-errors')

const ObjectId = require('mongodb').ObjectId

function convertToObjectId(id) {
    return new ObjectId(id+'')
}

function handleError(err, req, res) {
    console.log(err);
    let status = 'failed'
    if(err instanceof CustomisedError) {
        const { message, code = 502 } = err
        res.status(code)
        return res.send({ status, message, code })
    }

    res.status (502)
    res.send({status, message: 'Something went wrong', code: 502})
}

module.exports = {
    convertToObjectId, handleError
}

