import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = (props) => (
  <>
    <h2>Login to application</h2>
    <form onSubmit={props.handleSubmit}>
      <div>
        username <input className='username' value={props.username} onChange={props.handleUsernameChange} type='text' />
      </div>
      <div>
        password <input className='password' value={props.password} onChange={props.handlePasswordChange} type='password' />
      </div>
      <input value='login' type='submit' />
    </form>
  </>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired
}

export default LoginForm
