import React from 'react'

const Notification = props => {
  return (
    <>
      <p className='message'>
        {props.message}
      </p>
      <p className='error'>
        {props.error}
      </p>
    </>
  )
}

export default Notification
