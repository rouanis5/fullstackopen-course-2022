const loggerParent = (callback, ...params) => {
  if (process.env.NODE_ENV !== 'test') {
    // pass a callback function
    // pass a param or an array of params
    callback(params.length === 1 ? params[0] : params)
  }
}

const info = (...params) => loggerParent(console.log, ...params)
const error = (...params) => loggerParent(console.error, ...params)

module.exports = {
  info,
  error
}
