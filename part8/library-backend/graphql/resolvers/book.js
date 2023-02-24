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
      const author = authorName
        ? await Author.findOne({ name: authorName })
        : null
      if (author) {
        if (genre) {
          return await Book.find({
            author: author.id,
            genres: [genre]
          }).populate('author')
        }
        return await Book.find({ author: author.id }).populate('author')
      }
      if (genre) {
        return await Book.find({ genres: { $in: [genre] } }).populate('author')
      }
      return await Book.find({}).populate('author')
    }
  },
  // Book: {
  //   author: async (root, args, { loaders }) => {
  //     return await loaders.book.author.load(root.author)
  //   }
  // },
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
        const result = await Book.create({ ...args, author: author._id })
        const book = result.populate('author')
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
