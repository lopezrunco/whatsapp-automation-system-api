const { model, Schema } = require('mongoose')
const { listSchema } = require('./list')

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        type: String,
        required: true,
        trim: true
    }, 
    lists: {
        type: [listSchema],
        default: () => ([]) // If the users doesn't have list, add an empty list
    }
})

const userModel = model('users', userSchema)

module.exports = {
    userSchema,
    userModel
}