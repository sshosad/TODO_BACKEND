class CustomisedError extends Error {
    constructor({ m, c }) {
        super(m)
        this.message = m
        this.code = c

        Error.captureStackTrace(this, this.constructor)
    }
}

module.exports = {
    CustomisedError
}