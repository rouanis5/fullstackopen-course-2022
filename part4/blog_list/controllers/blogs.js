const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')

blogsRouter.route('/')
  .get((request, response, next) => {
    Blog
      .find({})
      .then(blogs => {
        response.json(blogs)
      })
      .catch(error => next(error))
  })

  .post((request, response, next) => {
    const blog = new Blog(request.body)

    blog
      .save()
      .then(result => {
        response.status(201).json(result)
      })
      .catch(error => next(error))
  })

module.exports = blogsRouter