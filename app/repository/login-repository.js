class LoginRepository {
    constructor({ userService, errors }) {
        this.userService = userService
        this.errors = errors
    }

    async signUp({ firstName, lastName, email, password }) {
        const projection = { email_id: 1 }
        const existingUser = await this.userService.fetchUserInfoByEmailId({  emailId: email.toLowerCase(), projection})

        if(existingUser) {
            throw new this.errors.CustomisedError({ m: 'User already present with the given email', c: 500 })
        }

        const createdUser = await this.userService.createuser({ firstName, lastName, email, password })

        return { _id: createdUser.insertedId, firstName, lastName, email, password }
    }

    async login({ email, password }) {
        const projection = { email_id: 1, password: 1, first_name: 1, last_name: 1 }

        const userInfo = await this.userService.fetchUserInfoByEmailId({  emailId: email.toLowerCase(), projection})

        if(!userInfo) {
            throw new this.errors.CustomisedError({ m: 'No user found with given email id', c: 500 })
        }

        const { password: existingUserPassword, first_name, last_name, _id } = userInfo

        if(password !== existingUserPassword) {
            throw new this.errors.CustomisedError({ m: 'You have entered a wrong password', c: 500 })
        }

        return { firstName: first_name, lastName: last_name, email, _id }
    }
    
}


module.exports = LoginRepository