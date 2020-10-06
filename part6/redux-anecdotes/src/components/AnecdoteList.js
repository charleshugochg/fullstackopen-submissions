import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const AnecdoteList = (props) => {
  const sortedAnecdotes = props.anecdotes.sort((a,b) => b.votes - a.votes)

  const handleVote = anecdote => {
    props.vote(anecdote)

    props.notify(`you voted '${anecdote.content}'`, 5)
  }

  return (
    <>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}

const mapStateToProps = state => {
  return {
    anecdotes: state.anecdotes.filter(a => a.content.includes(state.filter))
  }
}

const mapDispatchToProps = {
  vote,
  notify
}

export default connect(mapStateToProps, mapDispatchToProps)(AnecdoteList)
