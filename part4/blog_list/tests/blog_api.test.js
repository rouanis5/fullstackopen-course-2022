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

it('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('content-Type', /application\/json/)

  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

it('verify that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  expect(firstBlog._id).not.toBeDefined()
  expect(firstBlog.id).toBeDefined()
})

it('verify that a blog added successfully and the number of blogs is increased by one', async () => {
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
  expect(response2.body).toHaveLength(helper.initialBlogs.length + 1)
})

it('verify that if the likes property is missing from the request, it will default to the value 0', async () => {
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

it('verify that if the title or url properties are missing from the request data, gives 400 Bad Request', async () => {
  const missingBlog = {
    author: 'Robert C. Martin',
    likes: 10
  }

  await api.post('/api/blogs')
    .send(missingBlog)
    .expect(400)
})

describe('deleting a blog', () => {
  it('deleting existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating blog', () => {
  it('try to update a title of an existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    const blogAfterUpdate = await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .send({ title: 'this is a randoom title' })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogBeforeUpdate.title)
    expect(blogAfterUpdate.body.title).toBe('this is a randoom title')
    expect(titles).toContain(blogAfterUpdate.body.title)
  })

  it('try to increase likes of an existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .send({ likes: blogBeforeUpdate.likes + 1 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)

    const blogAfterUpdate = blogsAtEnd.find(blog => blog.id === blogBeforeUpdate.id)
    expect(blogAfterUpdate).toEqual({ ...blogBeforeUpdate, likes: blogBeforeUpdate.likes + 1 })
  })

  it('try to update unexisted blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const { id } = blogsAtStart[0]
    await Blog.findByIdAndDelete(id)

    await api.put(`/api/blogs/${id}`)
      .send({ likes: 1 })
      .expect(404)
  })

  it('try to update blog with a malformated id', async () => {
    await api.put('/api/blogs/1')
      .send({ likes: 1 })
      .expect(400)
  })

  it('try to update blog with unvalid params', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const { id } = blogsAtStart[0].id

    // test negative number
    await api.put(`/api/blogs/${id}`)
      .send({ likes: -20 })
      .expect(400)
    // test decimal number
    await api.put(`/api/blogs/${id}`)
      .send({ likes: 12.12 })
      .expect(400)
    // test unvalid url
    await api.put(`/api/blogs/${id}`)
      .send({ url: 'i am a non valid url xD' })
      .expect(400)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
