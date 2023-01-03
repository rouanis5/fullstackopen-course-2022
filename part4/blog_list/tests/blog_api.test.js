const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/Blog')
const helper = require('./blog_test_helper')

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('verifiy that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  expect(firstBlog._id).not.toBeDefined()
  expect(firstBlog.id).toBeDefined()
})

test('verify that a blog added successfully and the number of blogs is increased by one', async () => {
  const oneBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0
  }
  const response1 = await api.post('/api/blogs')
    .send(oneBlog)
    .expect(201)
  expect(response1.body.url).toBe(oneBlog.url)

  const response2 = await api.get('/api/blogs')
    .expect(200)
  expect(response2.body).toHaveLength(++helper.initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})
