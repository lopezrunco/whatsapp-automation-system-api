const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            user.lists.push(request.body)
            user.save()
                .then(() => {
                    response.status(201).json({
                        message: 'List created!'
                    }).end()
                })
                .catch(error => {
                    console.error(error)
                    response.status(500).json({
                        message: 'Error creating the list'
                    })
                })
        })
        .catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error creating the list'
            })
        })
}