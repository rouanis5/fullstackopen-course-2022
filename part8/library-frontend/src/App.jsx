import { useEffect, useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { ALL_BOOKS, BOOK_ADDED, updateBooksCache } from './querries/book'
import { Route, Routes, Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import { Recommand } from './components/Recommand'

const App = () => {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  const client = useApolloClient()

  const { data, error, loading } = useQuery(ALL_BOOKS)

  useSubscription(BOOK_ADDED, {
    onData: ({ data: res }) => {
      const book = res.data.bookAdded

      Swal.fire({
        icon: 'success',
        title: `${book.title} is added!`,
        showConfirmButton: false,
        timer: 1500
      })

      updateBooksCache(client.cache, { query: ALL_BOOKS }, book)
    }
  })

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  useEffect(() => {
    const localToken = localStorage.getItem('library-user-token')
    if (!localToken) return
    setToken(localToken)
  }, [])

  useEffect(() => {
    if (loading || error) return
    setBooks(data.allBooks)
  }, [data, loading, error])

  return (
    <div>
      <Navigation token={token} logout={logout} />
      <Routes>
        <Route path="/">
          <Route index element={<Authors />} />
          <Route path="books" element={<Books data={books} />} />
          {token ? (
            <>
              <Route path="recommand" element={<Recommand data={books} />} />
              <Route path="add" element={<NewBook />} />
            </>
          ) : (
            <Route path="login" element={<LoginForm setToken={setToken} />} />
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
