import { Route, Routes, Navigate } from 'react-router-dom'
import Navigation from './components/Navigation'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'

const App = () => {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path="/">
          <Route index element={<Authors />} />
          <Route path="books" element={<Books />} />
          <Route path="add" element={<NewBook />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default App
