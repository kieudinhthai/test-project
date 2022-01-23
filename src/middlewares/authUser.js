const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    try {
        var token = jwt.verify(req.cookies.tokenUser, 'mk')
        if (token) {
            next()
           
        }
    } catch (error) {

         res.json({message: "Please login with user account"})
    }
}