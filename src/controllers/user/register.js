const bcrypt = require('bcrypt')
const Joi = require('joi')

const { CONSUMER_TOKEN_TYPE, REFRESH_TOKEN_TYPE } = require('../../utils/token-types')
const createToken = require('../../utils/create-token')
const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    const user = request.body

    const schema = Joi.object({
        name: Joi.string().alphanum().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(7).max(50).required()
    })

    const validationResult = schema.validate(user)

    if (!validationResult.error) {
        user.password = bcrypt.hashSync(user.password, 2)

        userModel
            .create({
                password: user.password,
                email: user.email,
                name: user.name,
                role: 'BASIC',
                lists: []
            }).then(user => {
                const userWithoutPassword = user.toObject() // Obtain the user in plain
                delete userWithoutPassword.lists
                delete userWithoutPassword.password
                userWithoutPassword.token = createToken(user, CONSUMER_TOKEN_TYPE, '20m')
                userWithoutPassword.refreshToken = createToken(user, REFRESH_TOKEN_TYPE, '2d')

                response.json({
                    user: userWithoutPassword
                })
            }).catch(error => {
                response.status(500).json({
                    message: 'Could not register the user'
                })
            })
    } else {
        response.status(400).json({
            message: validationResult.error
        })
    }
}