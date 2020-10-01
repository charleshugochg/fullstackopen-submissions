const usersRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/User')

usersRouter.get('/', async (req, res, next) => {
  try {
    const users = await User.find({}).populate('blogs')
    res.json(users)
  } catch (err) {
    next(err)
  }
})

usersRouter.post('/', async (req, res, next) => {
  if (!req.body.password || req.body.password.length < 3)
    return res.status(400).json({ error: 'invalid password' })

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(req.body.password, saltRounds)

  const user = User({
    name: req.body.name,
    username: req.body.username,
    passwordHash
  })

  try {
    const savedUser = await user.save()
    res.status(201).json(savedUser)
  } catch (err) {
    next(err)
  }
})

module.exports = usersRouter
