const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

let persons = [
  {
    "name": "Arto Hellas",
    "phone": "040-123456",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "phone": "39-44-5323523",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "phone": "12-43-234345",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "phone": "39-23-6423122",
    "id": 4
  }
]

const generateId = () => Math.floor(Math.random() * 1000000)

const app = express()
app.use(cors())
app.use(express.json())
morgan.token('body', (req, res) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res) => {
  res.send(`<div>phonebook has info for ${persons.length} people</div> <div>${new Date()}</div>`)
})

app.get('/api/persons', (req, res) => {
  res.json(persons)
})

app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const person = persons.find(p => p.id === id)
  
  if (person) {
    return res.json(person)
  } else {
    return res.status(404).end()
  }
})

app.post('/api/persons', (req, res) => {
  const id = generateId()
  const body = req.body

  if (!body.name || !body.phone) {
    return res.status(400).json({
      error: "name or phone is missing"
    })
  }

  if (persons.find(p => p.name === body.name)) {
    return res.status(400).json({
      error: "name has already existed"
    })
  }

  const person = {
    name: body.name,
    phone: body.phone,
    id: id
  }

  persons = persons.concat(person)

  return res.json(person)
})

app.delete('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  persons = persons.filter(p => p.id !== id)
  
  return res.status(204).end()
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
