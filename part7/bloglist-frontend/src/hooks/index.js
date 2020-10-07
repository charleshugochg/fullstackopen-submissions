import { useState, useEffect } from 'react'
import userService from '../services/users'

export const useField = type => {
  const [value, setValue] = useState('')

  const onChange = event => setValue(event.target.value)

  const reset = () => setValue('')

  return [
    {
      type,
      value,
      onChange,
    },
    reset
  ]
}

export const useUsers = () => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    userService.getAll()
      .then(res => setUsers(res))
  }, [])

  return users
}
