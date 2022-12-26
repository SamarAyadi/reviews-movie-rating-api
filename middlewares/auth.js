const jwtHelpers = require('../utils/jwtHelpers')

exports.check = (req, res, next) => {
    let token = req.headers['authorization']
    // Authorization: Bearer token ....
    token = token?.replace('Bearer', '')?.trim()
    const payload = jwtHelpers.verify(token)
    if (payload) {
        req.userId = payload.sub
        return next()
    }
    res.status(401).json({
        message: 'Unauthorized!'
    })
}