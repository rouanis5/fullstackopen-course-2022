const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const User = require('../models/User')
const { initialUsers, testingUsers } = require('./blog_test_helper')

beforeAll(async () => {
  const initUsers = await initialUsers()
  await User.deleteMany({})
  await User.insertMany(initUsers)
})

it('verifies that we get correct token after inserting an existing user', async () => {
  const result = await await api.post('/api/login')
    .send(testingUsers.one)
    .expect(200)
    .expect('content-type', /application\/json/)

  const r = result.body
  expect(r.token).toBeDefined()
  expect(r.username).toBe('user1')
  expect(r.name).toBe('user one')
  expect(r.password).not.toBeDefined()

  // verfiying the token
  const { id } = jwt.verify(r.token, process.env.SECRET)
  const user = await User.findById(id)
  expect(r.username).toBe(user.username)
})

it('Does not accept unexisted username to login', async () => {
  const result = await await api.post('/api/login')
    .send({
      username: 'no-one',
      password: 'very strong'
    })
    .expect(401)
    .expect('content-type', /application\/json/)

  expect(result.body.error).toBeDefined()
  expect(result.body.error).toContain('invalid username or password')
})

it('Does not accept a user to login with a wrong password', async () => {
  const result = await await api.post('/api/login')
    .send({
      username: testingUsers.one.username,
      password: 'wrong password'
    })
    .expect(401)
    .expect('content-type', /application\/json/)

  expect(result.body.error).toBeDefined()
  expect(result.body.error).toContain('invalid')
})

it('returns 400 bad request when the username or password is missing', async () => {
  const result = await await api.post('/api/login')
    .send({
      username: testingUsers.one.username
    })
    .expect(400)
    .expect('content-type', /application\/json/)

  expect(result.body.error).toBeDefined()
  expect(result.body.error).toContain('missing')
})

afterAll(() => {
  mongoose.connection.close()
})
