const testingRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

testingRouter.delete('/database', async (req, res) => {
  await Blog.deleteMany({})
  await User.deleteMany({})

  res.status(204).end()
})

module.exports = testingRouter
