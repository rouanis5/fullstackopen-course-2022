require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

console.log('connecting to MONGODB_URI')

mongoose.connect(url)
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connecting to MongoDB:', error.message)
  })

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    validate: {
      validator: function(v) {
        // has length of 8 or more
        // if formed of two parts that are separated by -
        // the first part has two or three numbers 
        // and the second part also consists of numbers
        return /(^\d{2}-{0,1}\d{6,}$)|(^\d{3}-{0,1}\d{5,}$)/.test(v);
      },
      message: ({value}) => `${value} is not a valid phone number!`
    },
    required: true
  },
})

personSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Person', personSchema)