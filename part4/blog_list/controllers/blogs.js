const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.route('/')
  .get(async (req, res) => {
    const blogs = await Blog.find({})
    res.json(blogs)
  })

  .post(async (req, res) => {
    const blog = new Blog(req.body)

    const result = await blog.save()
    res.status(201).json(result)
  })

module.exports = blogsRouter
