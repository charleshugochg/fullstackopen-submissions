import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import BookList from './BookList'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
  const result = useQuery(ALL_BOOKS)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [books, setBooks] = useState([])
  const [filter, setFilter] = useState('')
  const [genres, setGenres] = useState([])

  useEffect(() => {
    if (result.data) {
      const genresWillUpdate = result.data.allBooks.length === 0 
        ? [] 
        : result.data.allBooks
          .map(book => book.genres)
          .reduce((a,b) => a.concat(b.filter(i => !a.includes(i))))
      setGenres(genresWillUpdate)
    }
  }, [result])

  useEffect(() => {
    if (booksResult.data)
      setBooks(booksResult.data.allBooks)
  }, [booksResult])

  useEffect(() => {
    getBooks({ variables: { genre: filter ? filter : null }})
  }, [filter]) // eslint-disable-line

  if (!props.show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <BookList books={books} />
      <div>
        {genres.map(genre => <button key={genre} onClick={() => setFilter(genre)}>{genre}</button>)}
        <button onClick={() => setFilter('')}>all genre</button>
      </div>
    </div>
  )
}

export default Books
