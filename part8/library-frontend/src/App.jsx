import { useEffect, useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import { ALL_BOOKS } from './querries/book'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'
import { Recommand } from './components/Recommand'

const App = () => {
  const [token, setToken] = useState(null)
  const [books, setBooks] = useState([])
  const { data, error, loading } = useQuery(ALL_BOOKS)

  const client = useApolloClient()

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
