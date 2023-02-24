const { GraphQLError } = require('graphql')
const Author = require('../../models/Author')

const resolvers = {
  Query: {
    authorCount: async () => await Author.collection.countDocuments(),
    allAuthors: async () => await Author.find({})
  },
  Author: {
    bookCount: async (root, args, { loaders }) => {
      // return await Book.countDocuments({ author: root.id })
      return await loaders.author.bookCount.load(root.id)
    }
  },
  Mutation: {
    editAuthor: async (root, { name, setBornTo }, { currentUser }) => {
      if (!currentUser) {
        throw new GraphQLError('not authenticated', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }
      try {
        return await Author.findOneAndUpdate(
          { name },
          { born: setBornTo },
          { new: true, runValidators: true, context: 'query' }
        )
      } catch (error) {
        throw new GraphQLError('author update failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            error
          }
        })
      }
    }
  }
}

module.exports = resolvers
