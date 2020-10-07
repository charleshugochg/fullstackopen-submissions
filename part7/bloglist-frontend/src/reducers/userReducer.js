import loginService from '../services/login'
import { notifyError } from './notiReducer'

const itemName = 'loggedUser'

const reducer = (state = null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  case 'REMOVE_USER':
    return null
  default:
    return state
  }
}

export const setUser = user => {
  return {
    type: 'SET_USER',
    data: user
  }
}

export const recover = () => {
  return async dispatch => {
    const savedUser = window.localStorage.getItem(itemName)
    if (savedUser) {
      const user = JSON.parse(savedUser)
      dispatch(setUser(user))
    }
  }
}

export const login = (credentials) => {
  return async dispatch => {
    try {
      const user = await loginService.login(credentials)
      dispatch(setUser(user))
      window.localStorage.setItem(itemName, JSON.stringify(user))
    } catch (err) {
      dispatch(notifyError(err.response.data.error))
    }
  }
}

export const logout = () => {
  return async dispatch => {
    window.localStorage.clear()
    dispatch({
      type: 'REMOVE_USER'
    })
  }
}

export default reducer
