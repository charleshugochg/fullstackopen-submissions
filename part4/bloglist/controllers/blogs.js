const express = require('express')
const jwt = require('jsonwebtoken')
const Blog = require('../models/Blog')
const User = require('../models/User')

const blogsRouter = express.Router()

blogsRouter.get('/', async (req, res, next) => {
  try {
    const blogs = await Blog.find({}).populate('user')
    res.json(blogs)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/', async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      ...req.body,
      user: user._id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    res.status(201).json(savedBlog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.post('/:id/comments', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)
    blog.comments = blog.comments.concat(req.body.comment)
    await blog.save()

    res.status(201).json(blog)
  } catch (err) {
    next(err)
  }
})

blogsRouter.delete('/:id', async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id)

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    if (!req.token || !decodedToken.id || blog.user.toString() !== decodedToken.id) {
      return res.status(401).json({error: 'token missing or invalid'})
    }

    await Blog.findByIdAndRemove(req.params.id)
    res.status(204).end()
  } catch (err) {
    next(err)
  }
})

blogsRouter.put('/:id', async (req, res, next) => {
  const blog = {
    ...req.body
  }
  delete blog.user

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {new: true}).populate('user')
    console.log(updatedBlog)
    res.json(updatedBlog)
  } catch (err) {
    next(err)
  }
})

module.exports = blogsRouter
