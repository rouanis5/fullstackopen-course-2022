require('dotenv').config()
const express = require('express')

const app = express()
const morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/api/persons', (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons)
  })
})

app.get('/api/info', (req, res) => {
  Person.find({}).then((persons) => {
    const text = `Phonebook has info for ${persons.length} people
    ${new Date()}`
    res.send(text)
  })
})
app.route('/api/persons/:id')
  .get((req, res, next) => {
    const { id } = req.params
    Person.findById(id)
      .then((person) => {
        if (person) {
          res.json(person)
        } else {
          res.status(404).end()
        }
      })
      .catch((error) => next(error))
  })
  .delete((req, res, next) => {
    const { id } = req.params
    Person.findByIdAndDelete(id)
      .then((result) => {
        if (result) {
          res.status(204).end()
        } else {
          res.status(404).end()
        }
      })
      .catch((error) => next(error))
  })
  .put((req, res, next) => {
    const { id } = req.params
    const { number } = req.body

    Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
      .then((updatedPerson) => {
        if (updatedPerson) {
          res.json(updatedPerson.toJSON())
        } else {
          res.status(404).end()
        }
      })
      .catch((error) => next(error))
  })

app.post('/api/persons', (req, res, next) => {
  const { name, number } = req.body

  // fisrt, we verify if the name is unique
  Person.find({ name })
    .then((foundPerson) => {
      if (foundPerson.length === 0) {
        const person = new Person({ name, number })
        person.save().then((savedPerson) => {
          res.json(savedPerson)
        })
          .catch((error) => next(error))
      } else {
        res.status(400).json({
          error: 'name must be unique',
        })
      }
    })
    .catch((error) => next(error))
})

// handler of requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
app.use(errorHandler)

const { PORT } = process.env
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
