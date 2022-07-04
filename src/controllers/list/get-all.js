const mongoose = require('mongoose')
const { userModel } = require('../../models/user')

module.exports = (request, response) => {
    userModel
        .findOne({ _id: request.user.id })
        .select('lists')
        .then(user => {
            userModel
                .aggregate([
                    { $match: { _id: mongoose.Types.ObjectId(request.user.id) } }, // Types.ObjectId obtains an ID from an object from a string
                    { $project: { count: { $size: '$lists' } } } // $project add a field (in this case $size)
                ])
                .then(countAggregation => {
                    const count = countAggregation[0].count
                    const meta = { count }
                    response.status(200).json({
                        meta,
                        lists: user.lists
                    })
                })
                .catch(error => {
                    console.error(error)
                    response.status(500).json({
                        message: 'Error obtaining the lists'
                    })
                })
        })
        .catch(error => {
            console.error(error)
            response.status(500).json({
                message: 'Error obtaining the lists'
            })
        })
}