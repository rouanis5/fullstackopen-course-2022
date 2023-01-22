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
      setBlogs(() => {
        return blogs.sort((a, b) => b.likes - a.likes)
      })
    )
  }, [])

  useEffect(() => {
    const localStorage = window.localStorage.getItem(constants.userLocalStorage)
    if (localStorage) {
      const userData = JSON.parse(localStorage)
      setUser(userData)
      blogService.setToken(userData.token)
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

  const deleteBlog = (blogToDelete) => {
    setBlogs(prevBlogs => prevBlogs.filter(blog => blog.id !== blogToDelete.id))
    notify(`${blogToDelete.title} is deleted !`)
  }

  const updateBlog = (oldBlog, newBlog) => {
    setBlogs((prev) =>
      prev.map(blog => blog.id === oldBlog.id
        ? newBlog
        : blog
      ).sort((a, b) => b.likes - a.likes)
    )
  }

  return (
    <>
      <h1>blogs</h1>
      { message && <Notification msg={message} type={messageType} />}
      { user === null
        ? <LoginForm onLogin={setUser} onNotify={notify} />
        : <div>
          <div>
            {user.name} logged in
            <button onClick={(e) => { logout(e) }}>logout</button>
          </div>
          <AddBlogForm onSuccess={setBlogs} onNotify={notify} />
          <br />
          {blogs.map(blog =>
            <Blog
              key={blog.id}
              blog={blog}
              onNotify={notify}
              onDelete={() => { deleteBlog(blog) }}
              onUpdate={(newBlog) => { updateBlog(blog, newBlog) }}
            />
          )}
        </div>}
    </>
  )
}

export default App
