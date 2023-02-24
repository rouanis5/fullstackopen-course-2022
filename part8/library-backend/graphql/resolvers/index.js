const merge = require('lodash/merge')
const author = require('./author')
const book = require('./book')
const user = require('./user')

const resolvers = merge(author, book, user)

module.exports = resolvers
