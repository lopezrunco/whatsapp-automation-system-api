const { Schema } = require('mongoose')

const listSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: false,
        trim: true
    }, numbers: {
        type: Array,
        default: []
    }
})

module.exports = {
    listSchema
}