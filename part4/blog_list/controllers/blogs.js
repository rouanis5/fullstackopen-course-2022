const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')
const jwt = require('jsonwebtoken')

blogsRouter.route('/')
  .get(async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  })

  .post(async (req, res) => {
    const { title, likes, url, author } = req.body

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const userId = decodedToken?.id
    if (!userId) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const user = await User.findById(userId)
    // if the user is invalid, the app's not gonna generate a token
    // we will have directly a missing or invalid token
    // if (!user) {
    //   return res.status(400).json({ error: 'unexisted user with this Id' })
    // }

    const blog = new Blog({
      title,
      likes,
      url,
      author,
      user: user._id
    })

    const savedBlog = await blog.save()
    // save the blog id on the user blogs
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()
    res.status(201).json(savedBlog)
  })

blogsRouter.route('/:id')
  .delete(async (req, res) => {
    const { id } = req.params

    const decodedToken = jwt.verify(req.token, process.env.SECRET)
    const userId = decodedToken?.id
    if (!userId) {
      return res.status(401).json({ error: 'token missing or invalid' })
    }

    const blog = await Blog.findById(id)
    if (!blog) {
      return res.status(404).end()
    }
    if (blog.user.toString() !== userId) {
      return res.status(401).json({ error: 'its not your blog' })
    }

    await blog.delete()
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
