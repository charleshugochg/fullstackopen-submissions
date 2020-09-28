const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide password as an argument: node mongo.js <password>')
  process.exit(1)
}

if (process.argv.length > 3 && process.argv.length < 5) {
  console.log('Please provide person\'s name and number as well: node mongo.js <password> <name> <number>')
  process.exit(1)
}

if (process.argv.length > 5) {
  console.log('Please double check your arguments. Note: if the name has space you should quote between \'"\'')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://admin:${password}@cluster0.4jl6f.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true })

const personSchema = mongoose.Schema({
  name: String,
  phone: String
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length > 3) {
  const name = process.argv[3]
  const number = process.argv[4]

  const person = new Person({
    name: name,
    phone: number
  })

  person.save().then(() => {
    console.log('person is saved')
    mongoose.connection.close()
  })
} else {
  Person.find({}).then(result => {
    console.log('phonebook:')
    result.map(p => console.log(`${p.name} ${p.phone}`))
    mongoose.connection.close()
  })
}
