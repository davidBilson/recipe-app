    const express = require('express')
    const jwt = require('jsonwebtoken')
    const bcrypt = require('bcrypt')
    const UserModel = require('../models/Users.js')

    const router =  express.Router()

    router.post("/register", async (req, res) => {
        const {username, password} = req.body
        const user = await UserModel.findOne({ username })

        if (user) {
            return res.json({ message: "User already exists!" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newUser = await UserModel.create({ username, password: hashedPassword })
        await newUser.save();

        res.json({ message: "User registered successfully!" })
    })

    router.post("/login", async (req, res) => {
        const { username, password } = req.body
        const user = await UserModel.findOne({ username })

        if(!user) {
            return res.json ({ message: "User does not exist!", success: false})
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)

        if (!isPasswordValid) {
            return res.json({ message: "Username or Password Is Incorrect", success: false})
        }

        const token = jwt.sign({id: user._id}, "secret")
        res.json({token, userId: user._id, userName: user.username, success: true})

    })

    const UserRouter = router
    module.exports = UserRouter