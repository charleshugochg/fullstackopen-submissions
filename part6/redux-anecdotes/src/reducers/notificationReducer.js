let timeoutId

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'NOTIFY':
      return action.data
    case 'CLEAR':
      return ''
    default:
      return state
  }
}

export const notify = (message, sec) => {
  return async dispatch => {
    clearTimeout(timeoutId)
    dispatch({
      type: 'NOTIFY',
      data: message
    })
    timeoutId = setTimeout(() => {
      dispatch({
        type: 'CLEAR'
      })
    }, sec * 1000)
  }
}

export default reducer
