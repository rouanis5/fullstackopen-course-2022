const mongoose = require('mongoose')

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    default: 'anonymous'
  },
  url: {
    type: String,
    required: true,
    validate: (value) => {
      const urlRegex =
        /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/
      return urlRegex.test(value)
    },
    message: ({ value }) => `${value} is not a valid URL!`
  },
  comments: [{
    type: String,
    minlength: 1
  }],
  likes: {
    type: Number,
    default: 0,
    min: 0,
    validate: {
      validator: (v) => Number.isInteger(v),
      message: ({ v }) => `${v} is not an integer value`
    }
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
