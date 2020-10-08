import React, { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import BookList from './BookList'
import { ME, ALL_BOOKS } from '../queries'

const Recommendation = (props) => {
  const meResult = useQuery(ME)
  const [getBooks, booksResult] = useLazyQuery(ALL_BOOKS)
  const [genre, setGenre] = useState('')
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (meResult.data && meResult.data.me) {
      setGenre(meResult.data.me.favoriteGenre)
      getBooks({ variables: { genre: meResult.data.me.favoriteGenre }})
    }
  }, [meResult]) //eslint-disable-line

  useEffect(() => {
    if (booksResult.data)
      setBooks(booksResult.data.allBooks)
  }, [booksResult])

  if (!props.show) return null

  if (booksResult.loading || meResult.loading) {
    return ('loading...')
  }

  return (
    <>
      <h2>recommendations</h2>
      books in your favorite genre {genre}
      <br />
      <BookList books={books} />
    </>
  )
}

export default Recommendation
