const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app)

const User = require('../models/User')
const helper = require('./blog_test_helper')

let initialUsers = null

beforeEach(async () => {
  if (!initialUsers) {
    initialUsers = await helper.initialUsers()
  }
  await User.deleteMany({})
  await User.insertMany(initialUsers)
})

describe('inserting new user', () => {
  it('verifies that the user is created sucessfully', async () => {
    const req = await api.post('/api/users')
      .send({
        username: 'ouanis',
        name: 'user ouanis',
        password: 'a very strong password'
      })
      .expect(201)
      .expect('content-Type', /application\/json/)

    const newUser = req.body
    expect(newUser.username).toBe('ouanis')
    expect(newUser._id).not.toBeDefined()
    expect(newUser.passwordHash).not.toBeDefined()

    const usersInDb = await helper.usersInDb()
    const usernames = usersInDb.map(user => user.username)
    expect(usernames).toHaveLength(initialUsers.length + 1)
  })

  it('verifies the password is hashed', async () => {
    await api.post('/api/users')
      .send({
        username: 'ouanis',
        name: 'user ouanis',
        password: 'a very strong password'
      })
      .expect(201)

    const userAfter = await User.findOne({ username: 'ouanis' })
    expect(userAfter.password).not.toBeDefined()
    expect(userAfter.passwordHash).not.toBe('a very strong password')
  })

  it('verifies that the username is unique', async () => {
    const result = await api.post('/api/users')
      .send({
        username: 'user1',
        name: 'user ouanis',
        password: 'a very strong password'
      })
      .expect(400)
      .expect('content-type', /application\/json/)

    expect(result.body.error).toContain('username must be unique')

    // verifies on database if it is created or not
    const usersInDb = await helper.usersInDb()
    expect(usersInDb).toHaveLength(initialUsers.length)
  })

  describe('tests if a property is missing or less than 3 characters long, gives 400 Bad Request', () => {
    it('verifies missing username', async () => {
      const result = await api.post('/api/users')
        .send({
          name: 'user ouanis',
          password: 'a very strong password'
        })
        .expect(400)
        .expect('content-type', /application\/json/)

      expect(result.body.error).toBeDefined()
      // verifies on database if it is created or not
      const usersInDb = await helper.usersInDb()
      expect(usersInDb).toHaveLength(initialUsers.length)
    })

    it('verifies missing password', async () => {
      const result = await api.post('/api/users')
        .send({
          username: 'ouanis',
          name: 'user ouanis'
        })
        .expect(400)
        .expect('content-type', /application\/json/)

      expect(result.body.error).toBeDefined()

      // verifies on database if it is created or not
      const usersInDb = await helper.usersInDb()
      const usernames = usersInDb.map(user => user.username)
      expect(usernames).not.toContain('ouanis')
      expect(usernames).toHaveLength(2)
    })

    it('verfies username length', async () => {
      const result = await api.post('/api/users')
        .send({
          username: 'ou',
          password: 'password'
        })
        .expect(400)
        .expect('content-type', /application\/json/)

      expect(result.body.error).toBeDefined()
      // verifies on database if it is created or not
      const usersInDb = await helper.usersInDb()
      const usernames = usersInDb.map(user => user.username)
      expect(usernames).not.toContain('ou')
      expect(usernames).toHaveLength(initialUsers.length)
    })

    it('verfies password length', async () => {
      const result = await api.post('/api/users')
        .send({
          username: 'ouanis',
          password: '12'
        })
        .expect(400)
        .expect('content-type', /application\/json/)

      expect(result.body.error).toBeDefined()
      // verifies on database if it is created or not
      const usersInDb = await helper.usersInDb()
      const usernames = usersInDb.map(user => user.username)
      expect(usernames).toHaveLength(initialUsers.length)
      expect(usernames).not.toContain('ouanis')
    })
  })
})

describe('reading users', () => {
  it('verifies the number of users', async () => {
    const users = await api.get('/api/users')
      .expect(200)
      .expect('content-Type', /application\/json/)

    expect(users.body).toHaveLength(initialUsers.length)
  })

  it('verify that the unique identifier property of the user is named id', async () => {
    const users = await api.get('/api/users')

    expect(users.body[0].id).toBeDefined()
    expect(users.body[0]._id).not.toBeDefined()
  })

  it('verifies the password is hidden', async () => {
    const users = await api.get('/api/users')

    expect(users.body[0].password).not.toBeDefined()
    expect(users.body[0].passwordHash).not.toBeDefined()
  })
})

afterAll(() => {
  mongoose.connection.close()
})
