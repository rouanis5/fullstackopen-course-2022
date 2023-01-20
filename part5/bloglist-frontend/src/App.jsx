import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import constants from './config/constants'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const localStorage = window.localStorage.getItem(constants.userLocalStorage)
    if (localStorage) {
      const userData = JSON.parse(localStorage)
      setUser(userData)
    }
  }, [])

  const logout = (e) => {
    e.preventDefault()
    setUser(null)
    window.localStorage.removeItem(constants.userLocalStorage)
    blogService.setToken(null)
  }

  return (
    <>
    { user === null
      ? <LoginForm onLogin={setUser} />
      : <div>
        <AddBlogForm onSuccess={setBlogs} />
          <h2>blogs</h2>
          <div>
            {user.name} logged in
            <button onClick={(e) => { logout(e) }}>logout</button>
          </div>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>
    }
    </>
  )
}

export default App
