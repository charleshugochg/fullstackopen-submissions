import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const noti = useSelector(store => store.noti)

  return (
    <>
      <p className='message'>
        {noti.message}
      </p>
      <p className='error'>
        {noti.error}
      </p>
    </>
  )
}

export default Notification
