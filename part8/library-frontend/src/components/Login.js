import React, { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../queries'

const Login = ({ onLogin, show }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login, result] = useMutation(LOGIN, {
    onError: (err) => {
      console.log(err.message)
    }
  })

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value
      localStorage.setItem('user-token', token)
      setUsername('')
      setPassword('')
      onLogin(token)
    }
  }, [result, onLogin])

  if (!show) {
    return null
  }

  const submit = event => {
    event.preventDefault()
    login({ variables: { username, password }})
  }

  return (
    <form onSubmit={submit}>
      <div>
        username
        <input value={username} onChange={({ target }) => setUsername(target.value)} />
      </div>
      <div>
        password 
        <input value={password} onChange={({ target }) => setPassword(target.value)} type='password'/>
      </div>
      <button>login</button>
    </form>
  )
}

export default Login
