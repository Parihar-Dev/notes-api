const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.register = async(req, res) => {
    const {username, email, password} = req.body
    try {
        const hashed = await bcrypt.hash(password, 10)
        const user = new User({ username, email, password : hashed})
        await user.save()
        res.status(201).json({message : "User Registered"}) 
    } catch (err) {
        console.log(err)
        res.status(500).json({ error : "Registration Failed "})
    }
}

exports.login = async(req, res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({email})
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(401).json({ error : "Invalid Credentials "})
        }
        const token = jwt.sign({userId : user._id}, process.env.JWT_SECRET)
        res.json({ token })
    } catch (error) {
        res.status(500).json({ error : "Login failed" })
    }
}