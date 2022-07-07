module.exports = (roles) => { // Wrap a function inside another function to pass thr user role as parameter
    return (request, response, next) => {
        if (request.user) {
            const roleMatches = roles.find(role => role === request.user.role)
            if (roleMatches) {
                next()
            } else {
                return response.status(403).json({
                    message: 'Forbiden access'
                })
            }
        } else {
            return response.status(401).json({
                message: 'Invalid credentials'
            })
        }
    }
}