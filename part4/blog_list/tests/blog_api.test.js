const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/Blog')
const User = require('../models/User')
const helper = require('./blog_test_helper')

let usersId, initialBlogs, header0, header1
beforeAll(async () => {
  // adding two users
  const initUsers = await helper.initialUsers()
  await User.deleteMany({})
  await User.insertMany(initUsers)
  const result = await User.find({})
  usersId = JSON.parse(JSON.stringify(result)).map(user => user.id)
  initialBlogs = helper.initialBlogs(usersId[0], usersId[1])

  // get the users jwt token
  const user0 = await api.post('/api/login')
    .send(helper.testingUsers.one)

  const user1 = await api.post('/api/login')
    .send(helper.testingUsers.two)

  header0 = { Authorization: `bearer ${user0.body.token}` }
  header1 = { Authorization: `bearer ${user1.body.token}` }
})

beforeEach(async () => {
  await Blog.deleteMany({})
  const blogs = await Blog.insertMany(initialBlogs)
  // save each blog in the its user blogs array
  for (const blog of blogs) {
    const user = await User.findById(blog.user)
    user.blogs = user.blogs.concat(blog._id)
    await user.save()
  }
})

it('returns the correct amount of blog posts in the JSON format', async () => {
  const response = await api.get('/api/blogs')
    .expect(200)
    .expect('content-Type', /application\/json/)

  expect(response.body).toHaveLength(initialBlogs.length)
})

it('verify that the unique identifier property of the blog posts is named id', async () => {
  const response = await api.get('/api/blogs')
  const firstBlog = response.body[0]
  expect(firstBlog._id).not.toBeDefined()
  expect(firstBlog.id).toBeDefined()
})

it('verifies if the blog populates user information without showing password', async () => {
  const response = await api.get('/api/blogs')
  const owner = response.body[0].user
  expect(owner.username).toBe('user1')
  expect(owner.passwordHash).not.toBeDefined()
})

it('verifies if user populates blogs', async () => {
  const response = await api.get('/api/users')
    .expect(200)
  const { blogs } = response.body[1]
  expect(blogs).toHaveLength(2)
  expect(blogs[0].title).toBeDefined()
})

it('verify that a blog added successfully and the number of blogs is increased by one', async () => {
  const oneBlog = {
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 12
  }
  const result = await api.post('/api/blogs')
    .send(oneBlog)
    .set(header0)
    .expect(201)
  expect(result.body.url).toBe(oneBlog.url)

  const blogsInDb = await helper.blogsInDb()
  expect(blogsInDb).toHaveLength(initialBlogs.length + 1)
})

describe('verifying missing properties from the request', () => {
  it('verify that if the title is is missing, gives 400 Bad Request', async () => {
    const missingBlog = {
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 10
    }

    const result = await api.post('/api/blogs')
      .send(missingBlog)
      .set(header0)
      .expect(400)
      .expect('content-type', /application\/json/)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('title')
  })

  it('verify that if the URL is is missing, gives 400 Bad Request', async () => {
    const missingBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      likes: 10
    }

    const result = await api.post('/api/blogs')
      .send(missingBlog)
      .set(header1)
      .expect(400)
      .expect('content-type', /application\/json/)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('url')
  })

  it('verify likes property is missing, it will default to the value 0', async () => {
    const oneBlog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html'
    }
    const response = await api.post('/api/blogs')
      .send(oneBlog)
      .set(header0)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })
})

describe('deleting a blog', () => {
  it('deleting existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[1]

    await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set(header1)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length - 1)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogToDelete.title)
  })
})

describe('updating blog', () => {
  it('try to update a title of an existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    const blogAfterUpdate = await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .set(header0)
      .send({ title: 'this is a randoom title' })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).not.toContain(blogBeforeUpdate.title)
    expect(blogAfterUpdate.body.title).toBe('this is a randoom title')
    expect(titles).toContain(blogAfterUpdate.body.title)
  })

  it('try to increase likes of an existed blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .set(header0)
      .send({ likes: blogBeforeUpdate.likes + 1 })
      .expect(200)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const blogAfterUpdate = blogsAtEnd.find(blog => blog.id === blogBeforeUpdate.id)
    expect(blogAfterUpdate).toEqual({ ...blogBeforeUpdate, likes: blogBeforeUpdate.likes + 1 })
  })

  it('try to update unexisted blog', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const { id } = blogsAtStart[0]
    await Blog.findByIdAndDelete(id)

    await api.put(`/api/blogs/${id}`)
      .set(header0)
      .send({ likes: 1 })
      .expect(404)
  })

  it('try to update blog with a malformated id', async () => {
    const result = await api.put('/api/blogs/1')
      .set(header1)
      .send({ likes: 1 })
      .expect(400)
      .expect('content-type', /application\/json/)
    expect(result.body.error).toBeDefined()
  })

  it('try to update blog with unvalid params', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const { id } = blogsAtStart[0].id

    // test negative number
    const result1 = await api.put(`/api/blogs/${id}`)
      .set(header0)
      .send({ likes: -20 })
      .expect(400)
      .expect('content-type', /application\/json/)
    expect(result1.body.error).toBeDefined()
    // test decimal number
    const result2 = await api.put(`/api/blogs/${id}`)
      .set(header0)
      .send({ likes: 12.12 })
      .expect(400)
      .expect('content-type', /application\/json/)
    expect(result2.body.error).toBeDefined()
    // test unvalid url
    const result3 = await api.put(`/api/blogs/${id}`)
      .set(header0)
      .send({ url: 'i am a non valid url xD' })
      .expect(400)
      .expect('content-type', /application\/json/)
    expect(result3.body.error).toBeDefined()
  })
})

describe('when the authorization header is not provided, gives 401 Unauthorized', () => {
  it('verifies that if adding blog with missing authorization header, gives 401', async () => {
    const blog = {
      title: 'TDD harms architecture',
      author: 'Robert C. Martin',
      url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
      likes: 10
    }

    const result = await api.post('/api/blogs')
      .send(blog)
      .expect(401)
      .expect('content-type', /application\/json/)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('token')
  })

  it('verifies that if deleting blog with missing authorization header, gives 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[1]

    const result = await api.delete(`/api/blogs/${blogToDelete.id}`)
      .expect(401)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogToDelete.title)
  })

  it('verifies that if updating blog with missing authorization header, gives 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    const result = await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .send({ title: 'this is a randoom title' })
      .expect(401)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('token')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogBeforeUpdate.title)
    expect(titles).not.toContain('this is a randoom title')
  })
})

describe('verifing the blog owner before deleting or updating', () => {
  it('verifies that if deleting blog of another user, gives 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[1]

    const result = await api.delete(`/api/blogs/${blogToDelete.id}`)
      .set(header0)
      .expect(401)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('not match the blog owner')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogToDelete.title)
  })

  it('verifies that if deleting blog of another user, gives 401', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogBeforeUpdate = blogsAtStart[0]

    const result = await api.put(`/api/blogs/${blogBeforeUpdate.id}`)
      .set(header1)
      .send({ title: 'this is a randoom title' })
      .expect(401)

    const errorMsg = result.body.error
    expect(errorMsg).toBeDefined()
    expect(errorMsg.toLowerCase()).toContain('not match the blog owner')

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(initialBlogs.length)

    const titles = blogsAtEnd.map(blog => blog.title)
    expect(titles).toContain(blogBeforeUpdate.title)
    expect(titles).not.toContain('this is a randoom title')
  })
})

afterAll(() => {
  mongoose.connection.close()
})
