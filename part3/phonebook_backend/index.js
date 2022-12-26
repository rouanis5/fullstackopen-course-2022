require('dotenv').config()
const express = require('express')
const app = express()
var morgan = require('morgan')

const Person = require('./models/person')

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', req => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))


app.get("/api/persons", (req, res)=>{
  Person.find({}).then(persons => {
    res.json(persons)
  })
})

app.get("/api/info", (req, res)=>{
  Person.find({}).then(persons => {
    const text = `Phonebook has info for ${persons.length} people
    ${new Date()}`
    res.send(text)
  })

})
app.route("/api/persons/:id")
  .get((req, res, next)=>{
    const {id} = req.params
    Person.findById(id)
      .then(person => {
        if (person) {
          res.json(person)
        } else {
          res.status(404).end()
        }
      })
      .catch(error => next(error))
  })
  .delete((req, res, next)=>{
    const {id} = req.params
    Person.findByIdAndDelete(id)
      .then(result => {
        res.status(204).end()
      })
      .catch(error => next(error))
  })
  .put((req, res, next) => {
    const {id} = req.params
    const {number} = req.body

    if (!number){
      return res.status(400).json({
        error: "number is missing"
      })
    }

    Person.findByIdAndUpdate(id, {number}, {new: true})
      .then(updatedPerson => {
        res.json(updatedPerson.toJSON())
      })
      .catch(error => next(error))
  })

app.post("/api/persons", (req, res)=>{
  const {name, number} = req.body

  if (!name || !number){
    return res.status(400).json({
      error: "The name or number is missing"
    })
  }

  Person.find({name: name})
    .then((foundPerson)=>{
      if (foundPerson.length === 0){
        const person = new Person({name, number})
        person.save().then(savedPerson => {
          res.json(savedPerson)
        })
      } else {
        res.status(400).json({
         error: "name must be unique"
       })
      }
    })
})


// handler of requests with unknown endpoint
const unknownEndpoint = (req, res) => {
  res.status(404).send({ error: 'unknown endpoint' })
}
app.use(unknownEndpoint)

// handler of requests with result to errors
const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else{
    return response.status(400).json({ error: `error: ${error.name}` })
  }

  next(error)
}
app.use(errorHandler)

const {PORT} = process.env
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})