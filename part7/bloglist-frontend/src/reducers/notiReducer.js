const DEFAULT = {
  message: '',
  error: ''
}

const timeout = 5000
let timeoutIdMessage, timeoutIdError

const reducer = (state = DEFAULT, action) => {
  switch (action.type) {
  case 'SET_ERROR':
    return {
      ...state,
      error: action.data
    }
  case 'CLEAR_ERROR':
    return {
      ...state,
      error: ''
    }
  case 'SET_MESSAGE':
    return {
      ...state,
      message: action.data
    }
  case 'CLEAR_MESSAGE':
    return{
      ...state,
      message: ''
    }
  default:
    return state
  }
}

export const setMessage = message => {
  return {
    type: 'SET_MESSAGE',
    data: message
  }
}

export const clearMessage = () => {
  return {
    type: 'CLEAR_MESSAGE'
  }
}

export const notifyMessage = message => {
  return async dispatch => {
    clearTimeout(timeoutIdMessage)
    dispatch(setMessage(message))
    timeoutIdMessage = setTimeout(() => dispatch(clearMessage()), timeout)
  }
}

export const setError = message => {
  return {
    type: 'SET_ERROR',
    data: message
  }
}

export const clearError = () => {
  return {
    type: 'CLEAR_ERROR'
  }
}

export const notifyError = message => {
  return async dispatch => {
    clearTimeout(timeoutIdError)
    dispatch(setError(message))
    timeoutIdError = setTimeout(() => dispatch(clearError()), timeout)
  }
}

export default reducer
