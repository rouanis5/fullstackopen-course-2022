const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan('tiny'))

let data = [
  { 
    "id": 1,
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": 2,
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": 3,
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": 4,
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


app.get("/api/persons", (req, res)=>{
  res.json(data)
})

app.get("/api/info", (req, res)=>{
  const text = `Phonebook has info for ${data.length} people
  ${new Date()}`

  res.send(text)
})

app.get("/api/persons/:id", (req, res)=>{
  const {id} = req.params
  const person = data.find(person => person.id === parseInt(id))

  if (!person){
    res.status(404).end()
    return
  }

  res.json(person)
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

const PORT = 3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`);
})