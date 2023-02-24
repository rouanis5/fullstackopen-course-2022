const DataLoader = require('dataloader')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const Book = require('../models/Book')
const config = require('../utils/config')

/**
 * reference:
 * https://www.robinwieruch.de/graphql-apollo-server-tutorial/#batching-and-caching-in-graphql-with-data-loader
 */
const batchAuthorBooksCount = async (authorsId) => {
  /**
   * here, it gets all the books that their
   * author's id included in the keys
   *  */
  const books = await Book.find({
    author: {
      $in: authorsId
    }
  })

  /**
   * we will seperate the books depending on its author id
   * and will return the new arrays length
   */
  const result = authorsId.map(
    (id) => books.filter((book) => book.author.toString() === id).length
  )
  return result
}
/**
 * this works 100%, but you can just use the populate function
 */
// const batchBookAuthor = async (authorsId) => {
//   const authors = await Author.find({
//     id: {
//       $in: authorsId
//     }
//   })
//   const result = authorsId.map((id) =>
//     authors.find((author) => author.id.toString() === id.toString())
//   )
//   return result
// }

const getMe = async (req) => {
  const auth = req ? req.headers.authorization : null
  if (auth && auth.startsWith('Bearer ')) {
    const decodedToken = jwt.verify(auth.substring(7), config.JWT_SECRET)
    const currentUser = await User.findById(decodedToken.id)
    return currentUser
  }
}

const context = async ({ req, res }) => {
  const currentUser = await getMe(req)
  return {
    currentUser,
    loaders: {
      author: {
        bookCount: new DataLoader((authorsId) =>
          batchAuthorBooksCount(authorsId)
        )
      }
      // book: {
      //   author: new DataLoader((authorsId) => batchBookAuthor(authorsId))
      // }
    }
  }
}

module.exports = context
