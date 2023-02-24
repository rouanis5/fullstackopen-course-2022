const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')
const User = require('../../models/User')
const config = require('../../utils/config')

const resolvers = {
  Query: {
    me: (root, args, context) => context.currentUser
  },

  Mutation: {
    createUser: async (root, { username, favouriteGenre }) => {
      const user = new User({ username, favouriteGenre })
      return await user.save().catch((error) => {
        throw new GraphQLError('create user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [username],
            error
          }
        })
      })
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'password') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT'
          }
        })
      }

      const userForToken = {
        username: user.name,
        id: user.id
      }

      return {
        value: jwt.sign(userForToken, config.JWT_SECRET, {
          expiresIn: 3600
        })
      }
    }
  }
}

module.exports = resolvers
