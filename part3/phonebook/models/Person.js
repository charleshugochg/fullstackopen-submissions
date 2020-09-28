const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URL

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(err => {
    console.log('Error connecting to MongoDB', err.message)
  })

const personSchema = mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    unique: true,
    required: true
  },
  phone: {
    type: String,
    minlength: 8,
    required: true
  }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
  transform: (document, returnedObj) => {
    returnedObj.id = returnedObj._id
    delete returnedObj._id
    delete returnedObj.__v
  }
})

module.exports = mongoose.model('Person', personSchema)
