import React from 'react'
import { useDispatch } from 'react-redux'
import { TextField, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import { formStyle } from '../styles'
import { useField } from '../hooks'
import { login } from '../reducers/userReducer'

const useStyles = makeStyles(formStyle)

const LoginForm = () => {
  const dispatch = useDispatch()
  const [username] = useField('text')
  const [password] = useField('password')

  const classes = useStyles()

  const handleSubmit = async event => {
    event.preventDefault()

    const credentials = {
      username: username.value,
      password: password.value
    }

    dispatch(login(credentials))
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div>
        <TextField required variant='outlined' label='username' {...username} />
      </div>
      <div>
        <TextField required variant='outlined' label='password' {...password} />
      </div>
      <Button color='primary' type='submit'>login</Button>
    </form>
  )
}

export default LoginForm
