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

blogsRouter.route('/:id')
  .delete(async (req, res) => {
    await Blog.findByIdAndDelete(req.params.id)
    res.status(204).end()
  })
  .put(async (req, res) => {
    const { title, likes, url, author } = req.body
    const updatedPerson = await Blog.findByIdAndUpdate(
      req.params.id,
      { title, likes, url, author },
      { new: true, runValidators: true, context: 'query' }
    )
    if (updatedPerson) {
      res.json(updatedPerson.toJSON())
    } else {
      res.status(404).end()
    }
  })

module.exports = blogsRouter
