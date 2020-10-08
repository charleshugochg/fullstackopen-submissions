import React, { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
  const result = useQuery(ALL_AUTHORS)
  const [authors, setAuthors] = useState([])
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  const [editAuthor] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  useEffect(() => {
    if (result.data)
      setAuthors(result.data.allAuthors)
  }, [result])

  useEffect(() => {
    if (authors[0])
      setName(authors[0].name)
  }, [authors])

  const handleSubmit = event => {
    event.preventDefault()

    editAuthor({ variables: {name, setBornTo: Number(born)}})
    setBorn('')
  }

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>

      <h2>Set Birthyear</h2>
      <form onSubmit={handleSubmit} >
        <select value={name} onChange={({target}) => setName(target.value)}>
          {authors.map(a =>
            <option key={a.name} value={a.name}>{a.name}</option>
          )}
        </select>
        <br />
        born: <input value={born} onChange={({target}) => setBorn(target.value)} />
        <br />
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors
