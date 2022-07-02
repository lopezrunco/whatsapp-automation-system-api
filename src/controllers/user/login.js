const bcrypt = require('bcrypt')

const createToken = require('../../utils/create-token')
const { userModel } = require('../../models/user')
const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require('../../utils/token-types')

const returnCredentials = (user, response) => {
    // Delete sensible data in response
    const userWithoutPassword = user.toJSON()
    delete userWithoutPassword.lists
    delete userWithoutPassword.password

    userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, '20m')
    userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, '2d')

    response.json({
        user: userWithoutPassword
    })
}

module.exports = (request, response) => {
    userModel.findOne({
        email: request.body.email
    }).then(user => {
        if (user) {
            // Match the login password with the password from database
            const match = bcrypt.compareSync(request.body.password, user.password)
            if (match) {
                returnCredentials(user, response)
            } else {
                console.error('Password does not match')
                response.statuts(401).end()
            }
        } else {
            console.error('User not found')
            response.status(401).end()
        }
    }).catch(error => {
        console.error(error)
        response.status(500).json({
            message: 'Login error'
        })
    })
}