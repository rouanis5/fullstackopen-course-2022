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

app.get("/api/persons/:id", (req, res)=>{
  const {id} = req.params
  Person.findById(id)
    .then(person => {
      if (person) {
        res.json(person)
      } else {
        res.status(404).end()
      }
    })
})

app.delete("/api/persons/:id", (req, res)=>{
  const {id} = req.params
  data = data.filter(person => person.id !== parseInt(id))

  res.status(204).end()
})


app.post("/api/persons", (req, res)=>{
  const {name, number} = req.body

  if (!name || !number){
    return res.status(400).json({
      error: "The name or number is missing"
    })
  }

  const doesNameExist = data.find(person => person.name === name)
  if(doesNameExist){
    return res.status(400).json({
      error: "name must be unique"
    })
  }

  const id = Math.floor(Math.random() * (10 ** 8))
  const person = { id, name, number}
  data = [...data, person]
  res.json(person)
})

const {PORT} = process.env
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})