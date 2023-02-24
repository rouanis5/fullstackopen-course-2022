const { PubSub } = require('graphql-subscriptions')
const { GraphQLError } = require('graphql')
const Author = require('../../models/Author')
const Book = require('../../models/Book')

const pubsub = new PubSub()
const triggers = {
  BOOK_ADDED: 'BOOK_ADDED'
}

const resolvers = {
  Query: {
    bookCount: async () => await Book.collection.countDocuments(),
    allBooks: async (root, { author: authorName, genre }) => {
      const author = await Author.findOne({ name: authorName })
      if (author) {
        if (genre) {
          return await Book.find({ author: author.id, genres: [genre] })
        }
        return await Book.find({ author: author.id })
      }
      if (genre) {
        return await Book.find({ genres: { $in: [genre] } })
      }
      return await Book.find({})
    }
  },
  Book: {
    author: async (root) => {
      return await Author.findById(root.author)
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      // {title, published, author, genres}
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        let author = await Author.findOne({ name: args.author })
        if (!author) {
          author = await Author.create({ name: args.author })
        }
        const book = await Book.create({ ...args, author: author._id })
        pubsub.publish(triggers.BOOK_ADDED, { bookAdded: book })
        return book
      } catch (error) {
        throw new GraphQLError('Saving book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: args.title,
            error
          }
        })
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(triggers.BOOK_ADDED)
    }
  }
}

module.exports = resolvers
