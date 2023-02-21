import { useEffect, useState } from 'react'
import { useApolloClient } from '@apollo/client'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'

const App = () => {
  const [token, setToken] = useState(null)
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

  return (
    <div>
      <Navigation token={token} logout={logout} />
      <Routes>
        <Route path="/">
          <Route index element={<Authors />} />
          <Route path="books" element={<Books />} />
          {token ? (
            <Route path="add" element={<NewBook />} />
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
