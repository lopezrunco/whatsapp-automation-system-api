const { userModel } = require("../../models/user")

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .then(user => {
            user.lists.id(request.params.id).remove()
            user.save()
                .then(() => {
                    response.status(200).end()
                })
                .catch(error => {
                    console.error(error)
                    response.status(500).json({
                        message: 'Error deleting the list'
                    })
                })
        })
        .catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error deleting the list'
            })
        })
}