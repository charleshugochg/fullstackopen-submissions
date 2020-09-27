import React from 'react';
import Person from './Person';

const Persons = ({persons, handleRemove}) => (
  persons.map(person=><Person 
    key={person.id} 
    handleRemove={() => handleRemove(person.id)} 
    {...person} />)
)

export default Persons
