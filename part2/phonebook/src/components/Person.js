import React from 'react';

const Person = (props) => (
  <p>
    <span>{props.name} {props.phone} </span>
    <button onClick={props.handleRemove}>remove</button>
  </p>
)

export default Person
