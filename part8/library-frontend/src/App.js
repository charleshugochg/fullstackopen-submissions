import React, { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Recommendation from './components/Recommendation'
import { ALL_BOOKS, BOOK_ADDED } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()

  const updateCacheWith = bookAdded => {
    const includeIn = (set, obj) => set.map(b => b.id).includes(obj.id)
    
    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includeIn(dataInStore.allBooks, bookAdded)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(bookAdded)}
      })
    }
  }

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`${subscriptionData.data.bookAdded.title} added`)
      updateCacheWith(subscriptionData.data.bookAdded)
    }
  })

  useEffect(() => {
    const token = localStorage.getItem('user-token')
    setToken(token)
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const onLogin = (token) => {
    setToken(token)
    setPage('authors')
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token && <button onClick={() => setPage('add')}>add book</button>}
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && <button onClick={() => setPage('recommend')}>recommend</button>}
        {token && <button onClick={logout}>logout</button>}
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
      />

      <NewBook
        show={page === 'add'}
      />

      <Recommendation
        show={page === 'recommend'}
      />

      <Login
        show={page === 'login'}
        onLogin={onLogin}
      />

    </div>
  )
}

export default App
