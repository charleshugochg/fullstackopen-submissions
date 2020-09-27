import React from 'react';

const PersonForm = (props) => (
  <form onSubmit={props.handleSubmit}>
    <div>
      name: <input value={props.personValue} onChange={props.handlePersonChange}/>
    </div>
    <div>
      phone: <input value={props.phoneValue} onChange={props.handlePhoneChange} />
    </div>
    <button type='submit'>add</button>
  </form>
)

export default PersonForm
