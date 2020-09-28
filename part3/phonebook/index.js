require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const Person = require('./models/Person')

const app = express()
app.use(cors())
app.use(express.static('build'))
app.use(express.json())
morgan.token('body', (req) => JSON.stringify(req.body))
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get('/info', (req, res, next) => {
  Person.find({})
    .then(persons => 
      res.send(`<div>phonebook has info for ${persons.length} people</div> <div>${new Date()}</div>`)
    )
    .catch((err) => next(err))
})

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(persons => res.json(persons))
    .catch((err) => next(err))
})

app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => {
      if (person)
        res.json(person)
      else res.status(404).end()
    })
    .catch((err) => next(err))
})

app.post('/api/persons', (req, res, next) => {
  const body = req.body

  const person = Person({
    name: body.name,
    phone: body.phone,
  })

  person.save()
    .then(person => {
      console.log('saved a person')
      res.json(person)
    })
    .catch((err) => next(err))
})

app.put('/api/persons/:id', (req, res, next) => {
  const person = {
    name: req.body.name,
    phone: req.body.phone
  }

  Person.findByIdAndUpdate(req.params.id, person, {new: true})
    .then(person => {
      res.json(person)
    })
    .catch(err => next(err))
})

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => {
      res.status(204).end()
    })
    .catch((err) => next(err))
})

const errorHandler = (err, req, res, next) => {
  console.error(err)
  if (err.name === 'CastError') {
    res.status(400).json({ error: 'malformated id' })
  } else if(err.name === 'ValidationError') {
    res.status(400).json({ error: err.message })
  }

  next(err)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
})
