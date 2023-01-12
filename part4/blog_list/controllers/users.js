const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/User')

userRouter.route('/')
  .post(async (req, res) => {
    const { username, name, password } = req.body

    const existedUser = await User.findOne({ username })
    if (existedUser) {
      res.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      passwordHash
    })

    const savedUser = await user.save()

    res.status(201).json(savedUser)
  })
  .get(async (req, res) => {
    const users = await User.find({})
    return res.status(200).json(users)
  })

module.exports = userRouter
