import React from 'react'
import { connect } from 'react-redux'
import { getNew } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteForm = props => {
  const createAnecodote = async event => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''

    props.getNew(anecdote)
    props.notify(`you created '${anecdote}'`, 5)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={createAnecodote} >
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </>
  )
}

const mapDispatchToProps = {
  getNew,
  notify
}

export default connect(null, mapDispatchToProps)(AnecdoteForm)
