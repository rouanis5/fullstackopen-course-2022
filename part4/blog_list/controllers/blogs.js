const blogsRouter = require('express').Router()
const Blog = require('../models/Blog')
const User = require('../models/User')

blogsRouter.route('/')
  .get(async (req, res) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 })
    res.json(blogs)
  })

  .post(async (req, res) => {
    const { title, likes, url, author, userId } = req.body

    if (!userId) {
      return res.status(400).json({ error: 'empty user ID' })
    }
    const user = await User.findById(userId)
    if (!user) {
      return res.status(400).json({ error: 'unexisted user with this Id' })
    }

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
