const jwt = require('jsonwebtoken')

// By default, check the token type as CONSUMER
module.exports = (tokenType = 'CONSUMER') => {
    return (request, response, next) => {
        const token = request.headers.authorization

        try {
            const decoded = jwt.verify(token, process.env.JWT_KEY)
            if (decoded.type === tokenType) {
                // Insert the user data on the request
                request.user = {
                    id: decoded.id,
                    name: decoded.name,
                    email: decoded.email,
                    role: decoded.role
                }
                // Insert token on the request
                request.token = {
                    value: token,
                    type: decoded.type
                }
                // Call next middleware
                next()
            } else {
                return response.status(401).json({
                    message: 'Invalid token type'
                })
            }
        } catch (error) {
            console.error('Token error', error)
            // Return 401 if the token is not valid
            return response.status(401).json({
                message: 'Invalid credentials'
            })
        }
    }
}