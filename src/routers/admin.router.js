var express = require('express');
var router = express.Router();
const fs = require('fs');
var jwt = require('jsonwebtoken')

var Admin = require('../models/admin')
var User = require('../models/users')
var Auth = require('../middlewares/authAdmin');


const admin_data = fs.readFileSync('./data/data.json', 'utf8');
const databases = JSON.parse(admin_data);

// GET admin/all-user

router.get("/all-users", Auth.auth, async (req, res, next) => {
    try {
        const data = await User.find()
        res.json(data)

    } catch (error) {
        res.json(error)
    }
})

// GET admin/  
router.get("/:id", Auth.auth, async (req, res, next) => {
    try {
        const data = await Admin.find({ _id: req.params.id })
        if (data == null) {
            console.log("null")
        }
        else {
            res.json(data)
        }
    } catch (error) {
        res.json(error)
    }
})



// DELETE /admin/:id
router.delete("/:id", Auth.auth, async (req, res, next) => {
    try {
        const result = await User.deleteOne({ _id: req.params.id })

        res.json(result)

    } catch (error) {
        res.json(error)
    }
})

// POST user/login 
router.post("/login", async (req, res, next) => {
    try {
        const check = await Admin.find()
        if (check.length < 1) {
            await Admin.insertMany(databases)
        } else {

            const data = await Admin.findOne({ $and: [{ username: req.body.username }, { password: req.body.password }] })
            if (data) {
                let tokenAdmin = jwt.sign({ _id: data._id }, "mk")
                res.json({
                    message: "Login admin successful",
                    tokenAdmin: tokenAdmin
                })

            } else {
                res.json("User or password incorrect ")
            }
        }
    } catch (error) {
        res.status(404).json(error)

    }
})
module.exports = router;

