const { REGEX } = require("../helpers/constants")
const { CustomisedError } = require("../helpers/customised-errors")
const { handleError } = require("../helpers/utilities")

class LoginController {
    constructor({ loginRepository, errors }) {
        this.loginRepository = loginRepository
        this.errors = errors

        this.signUp = this.signUp.bind(this)
        this.login = this.login.bind(this)
    }

    async signUp(req, res) {
        try {
            console.log(req.body);
            const { firstName, lastName, email, password } = req.body
            
            if(!firstName) {
                throw new this.errors.CustomisedError({ m: 'First name is required', c: 502 })
            }

            if(!email || !password) {
                throw new this.errors.CustomisedError({ m: 'Email and password is required', c: 502 })
            }

            if(!REGEX.EMAIL.test(email)) {
                throw new this.err.CustomisedError({ m: 'Invalid email passed', c: 502 })
            }
            
            const response = await this.loginRepository.signUp({ firstName, lastName, email, password })
            
            res.send({ status: 'success', ...response })
        } catch(err) {
            return handleError(err, req, res)
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body

            if(!email || !password) {
                throw new this.errors.CustomisedError({ m: 'Email and password is required', c: 502 })
            }

            if(!REGEX.EMAIL.test(email)) {
                throw new this.err.CustomisedError({ m: 'Invalid email passed', c: 502 })
            }

            const response = await this.loginRepository.login({ email, password })
                
            res.send({ status: 'success', ...response })
        } catch(err) {
            return handleError(err, req, res)
        }
    }


} 

module.exports = LoginController