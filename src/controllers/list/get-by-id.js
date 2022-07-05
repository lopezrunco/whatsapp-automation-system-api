const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            const list = user.lists.id(request.params.id)
            response.status(200).json({
                list
            })
        })
        .catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error obtaining the list'
            })
        })
}