import { useState } from 'react'
import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/Login'

const App = () => {
  const [user, setUser] = useState(null)

  return (
    <div>
      <Navigation user={user} />
      <Routes>
        <Route path="/">
          <Route index element={<Authors />} />
          <Route path="books" element={<Books />} />
          {user ? (
            <Route path="add" element={<NewBook />} />
          ) : (
            <Route path="login" element={<LoginForm setUser={setUser} />} />
          )}
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
