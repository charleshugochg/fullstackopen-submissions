import React, {useState, useEffect} from 'react';

import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';

import services from '../services/persons';

import '../index.css';

const App = (props) => {
  const [persons, setPersons] = useState(props.persons)
  const [newPerson, setNewPerson] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [searchValue, setSearchValue] = useState('')
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const handleNewPersonChange = (event) => setNewPerson(event.target.value)

  const handleNewPhoneChange = (event) => setNewPhone(event.target.value)

  const handleSearchChange = (event) => setSearchValue(event.target.value)

  const isAlreadyExists = (name) => persons.filter( (person) => person.name === name).length !== 0;
  
  const handleSubmit = (event) => {
    event.preventDefault()

    if (isAlreadyExists(newPerson)) {
      if (window.confirm(`${newPerson} is already added to the book, replace the old number with the new one?`)){
        const person = {
          ...persons.find(p => p.name === newPerson),
          phone: newPhone,
        }
        services
          .update(person)
          .then(updatedPreson => {
            setPersons(persons.map(p => p.id !== updatedPreson.id ? p : updatedPreson))
            setMessage(`Updated ${updatedPreson.name}`)
            setTimeout(() => setMessage(null), 5000)
          })
          .catch(err => {
            setError(`Information of ${newPerson} has already been removed`)
            setTimeout(() => setError(null), 5000)
          })
      }
      return
    }

    const person = {
      name: newPerson,
      phone: newPhone,
    }

    services
      .create(person)
      .then(createdPerson => {
        setPersons(persons.concat(createdPerson))
        setMessage(`Added ${createdPerson.name}`)
        setTimeout(() => setMessage(null), 5000)
      })
      .catch(err => {
        setError(err.response.data.error)
        setTimeout(() => setError(null), 5000)
      })

    setNewPerson('')
    setNewPhone('')
  }

  const handleRemove = id => {
    if (window.confirm(`Remove ${persons.find(p => p.id === id).name} ?`))
    services
      .remove(id)
      .then(() =>
        setPersons(persons.filter(p => p.id !== id ))
      )
  }

  const personsToShow = searchValue === '' ? persons : persons.filter( (person) => person.name.toLowerCase().includes(searchValue.toLowerCase()) )

  useEffect( () => {
    services
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  return (
    <>
      <h2>Phonebook</h2>
      <Notification message={message} error={error} />
      <Filter value={searchValue} handleChange={handleSearchChange} />
      <h2>add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        personValue={newPerson}
        phoneValue={newPhone}
        handlePersonChange={handleNewPersonChange}
        handlePhoneChange={handleNewPhoneChange}
      />
      <h2>Numbers</h2>
     <Persons persons={personsToShow} handleRemove={handleRemove}/>
    </>
  )
}

export default App
