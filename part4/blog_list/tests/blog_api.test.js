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

test('verify that the unique identifier property of the blog posts is named id', async () => {
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
    likes: 12
  }
  const response1 = await api.post('/api/blogs')
    .send(oneBlog)
    .expect(201)
  expect(response1.body.url).toBe(oneBlog.url)

  const response2 = await api.get('/api/blogs')
    .expect(200)
  // this line for some reason, it makes the next test don't work
  // with an error message 'Exceeded timeout of 5000 ms for a hook'
  // in beforeEach function
  // expect(response2.body).toHaveLength(++helper.initialBlogs.length)
  expect(response2.body).toHaveLength(helper.initialBlogs.length + 1)
})

test('verify that if the likes property is missing from the request, it will default to the value 0', async () => {
  const oneBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
  }
  const response = await api.post('/api/blogs')
    .send(oneBlog)
    .expect(201)

  expect(response.body.likes).toBe(0)
})

test('verify that if the title or url properties are missing from the request data, gives 400 Bad Request', async () => {
  const missingBlog = {
    author: 'Robert C. Martin',
    likes: 10
  }

  await api.post('/api/blogs')
    .send(missingBlog)
    .expect(400)
})

afterAll(() => {
  mongoose.connection.close()
})
