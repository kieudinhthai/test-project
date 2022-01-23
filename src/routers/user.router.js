var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken')
var User = require('../models/users')
var Auth = require('../middlewares/authUser')

// GET /user/:id
router.get("/:id", Auth.auth, async (req, res, next) => {
    try {
        const data = await User.findOne({_id: req.params.id})
        if (data) {
            res.json(data)
        }
        else {
            res.json("no data")
        }
    } catch (error) {
        res.json(error)
    }
})
// POST /user
router.post("/", Auth.auth, async (req, res, next) => {
    const newUser = new User(req.body)
    try {
        const result = await User.findOne({username: req.body.username})
        if (result) {
            res.json("user is exist")
        }
        else {
        const resq = await newUser.save()
        res.json(resq)
        }
    } catch (error) {
        res.json(error)
    }
})

// PUT /user/:id
router.put("/:id", Auth.auth, async (req, res, next) => {
    
    try {
        const result = await User.updateOne({_id: req.params.id},req.body)
        res.json(result)
     
    } catch (error) {
        res.json(error)
    }
})
// POST user/login 
router.post( "/login",  async (req, res, next) => {
    try {
        const data = await User.findOne({ username: req.body.username, password: req.body.password })
        if (data != null) {
            let tokenUser = jwt.sign({_id: data._id }, "mk")
            res.json({
                message: "Login user successful",
                tokenUser: tokenUser
            })

        } else {
            res.json("User or password incorrect ")
        }
    } catch (error) {
        res.status(404).json(error)
    }
})

module.exports = router;
