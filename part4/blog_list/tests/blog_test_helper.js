const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const initialBlogs = (id0, id1 = id0, id2 = id1) => {
  return [
    {
      title: 'React patterns',
      author: 'Michael Chan',
      url: 'https://reactpatterns.com/',
      likes: 7,
      user: id0
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      user: id1
    },
    {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      user: id2
    }
  ]
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const users = {
  one: {
    username: 'user1',
    password: '852654Suuuu!'
  },
  two: {
    username: 'user2',
    password: '159753#ahaAa!'
  }
}
const initialUsers = async () => {
  const p1 = await bcrypt.hash(users.one.password, saltRounds)
  const p2 = await bcrypt.hash(users.two.password, saltRounds)

  return [
    {
      username: users.one.username,
      name: 'user one',
      passwordHash: p1
    },
    {
      username: users.two.username,
      name: 'user two',
      passwordHash: p2
    }
  ]
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb,
  testingUsers: users
}
