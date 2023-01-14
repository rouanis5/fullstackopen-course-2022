const Blog = require('../models/Blog')
const User = require('../models/User')
const bcrypt = require('bcrypt')
const saltRounds = 10

const initialBlogs = [
  {
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  },
  {
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(note => note.toJSON())
}
const usersInDb = async () => {
  const users = await User.find({})
  return users.map(user => user.toJSON())
}

const initialUsers = async () => {
  const p1 = await bcrypt.hash('852654Suuuu!', saltRounds)
  const p2 = await bcrypt.hash('159753#ahaAa', saltRounds)

  return [
    {
      username: 'user1',
      name: 'user one',
      passwordHash: p1
    },
    {
      username: 'user2',
      name: 'user two',
      passwordHash: p2
    }
  ]
}

module.exports = {
  initialBlogs,
  blogsInDb,
  initialUsers,
  usersInDb
}
