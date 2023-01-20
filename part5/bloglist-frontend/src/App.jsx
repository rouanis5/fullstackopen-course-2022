import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import constants from './config/constants'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [messageType, setMessageType] = useState('success')

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

  const notify = (msg, type = 'success', time = 2000) => {
    setMessage(msg)
    setMessageType(type)
    setTimeout(() => {
      setMessage('')
    }, time)
  }

  const logout = (e) => {
    e.preventDefault()
    const { name } = user
    setUser(null)
    window.localStorage.removeItem(constants.userLocalStorage)
    blogService.setToken(null)
    notify(`${name} logout successfully !`)
  }

  return (
    <>
    { message && <Notification msg={message} type={messageType} />}
    { user === null
      ? <LoginForm onLogin={setUser} onNotify={notify} />
      : <div>
        <AddBlogForm onSuccess={setBlogs} onNotify={notify} />
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
