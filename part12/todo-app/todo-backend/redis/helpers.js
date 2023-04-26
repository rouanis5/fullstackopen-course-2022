const { REDIS_ADDED_TODOS_KEY } = require('./constants')
const { Todo } = require('../mongo')
const { getAsync,setAsync } = require('./')


const getTodosCount = async () => {
  const cache = await getAsync(REDIS_ADDED_TODOS_KEY)

  if (!cache) {
    const counter = await Todo.countDocuments()
    await setAsync(REDIS_ADDED_TODOS_KEY, counter.toString())
    return counter
  }
  return parseInt(cache)
}

module.exports = {
  getTodosCount
}