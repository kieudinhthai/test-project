const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    username: { type: 'string', required: true },
    password: { type: 'string', required: true },
    fullName: { type: 'string', required: true },
    
})

module.exports = mongoose.model('Admin', adminSchema)