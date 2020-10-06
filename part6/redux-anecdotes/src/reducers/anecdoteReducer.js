import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)

  switch (action.type) {
    case 'UPDATE':
      return state.map(obj => obj.id === action.data.id ? action.data : obj)
    case 'NEW':
      return [
        ...state,
        action.data
      ]
    case 'INIT':
      return action.data
    default:
      return state
  }
}

export const vote = anecdote => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update({
      ...anecdote,
      votes: anecdote.votes + 1
    })
    dispatch({
      type: 'UPDATE',
      data: updatedAnecdote
    })
  }
}

export const getNew = anecdote => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch({
      type: 'NEW',
      data: newAnecdote
    })
  }
}

export const init = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: anecdotes
    })
  }
}

export default reducer
