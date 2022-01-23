const jwt = require('jsonwebtoken')

exports.auth = (req, res, next) => {
    try {
        var token = jwt.verify(req.cookies.tokenAdmin, 'mk')
        if (token) {
            next()
           // res.redirect('/')
        }
    } catch (error) {

         res.json({message: "Please login with Admin account"})
    }
}