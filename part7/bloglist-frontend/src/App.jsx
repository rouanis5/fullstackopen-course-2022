import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { alert, notify } from './reducers/notificationReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import constants from './config/constants'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  const sortByLikes = (arr) => {
    return arr.sort((a, b) => b.likes - a.likes)
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(() => sortByLikes(blogs)))
  }, [])

  useEffect(() => {
    const localStorage = window.localStorage.getItem(constants.userLocalStorage)
    if (localStorage) {
      const userData = JSON.parse(localStorage)
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [])

  const logout = (e) => {
    e.preventDefault()
    const { name } = user
    setUser(null)
    window.localStorage.removeItem(constants.userLocalStorage)
    blogService.setToken(null)
    dispatch(notify(`${name} logout successfully !`))
  }

  const login = async (userObj) => {
    try {
      const user = await loginService.login(userObj)
      setUser(user)
      blogService.setToken(user.token)
      window.localStorage.setItem(
        constants.userLocalStorage,
        JSON.stringify(user)
      )
      dispatch(notify(`${user.name} login`))
    } catch (exception) {
      dispatch(alert(exception.response.data.error))
      console.error(exception.response.data.error)
    }
  }

  const addBlog = async (blogObj) => {
    try {
      const result = await blogService.create(blogObj)
      setBlogs((previousBlogs) => [...previousBlogs, result])
      dispatch(notify(`a new blog ${result.title} by ${result.author} added`))
    } catch (exception) {
      dispatch(alert(exception.response.data.error))
      console.error(exception.response.data.error)
    }
  }

  const deleteBlog = async (blogToDelete) => {
    const isAllowed = window.confirm(`deleting ${blogToDelete.title} ?`)
    if (!isAllowed) return

    try {
      await blogService.remove(blogToDelete.id)
      setBlogs((prevBlogs) =>
        prevBlogs.filter((blog) => blog.id !== blogToDelete.id)
      )
      dispatch(notify(`${blogToDelete.title} is deleted !`))
    } catch (exception) {
      dispatch(alert(exception.response.data.error))
      console.error(exception.response.data.error)
    }
  }

  const increaseBlogLikes = async (oldBlog) => {
    try {
      const newBlog = await blogService.update(oldBlog.id, {
        likes: oldBlog.likes + 1
      })
      dispatch(notify(`a like added to ${oldBlog.title} by ${oldBlog.author}`))
      setBlogs((prev) =>
        sortByLikes(
          prev.filter((blog) => blog.id !== oldBlog.id).concat(newBlog)
        )
      )
      return newBlog
    } catch (exception) {
      dispatch(alert(exception.response.data.error))
      console.error(exception.response.data.error)
    }
  }

  return (
    <>
      <h1>blogs</h1>
      <Notification />
      {user === null ? (
        <LoginForm onLogin={login} />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button
              onClick={(e) => {
                logout(e)
              }}
            >
              logout
            </button>
          </div>
          <AddBlogForm onAdd={addBlog} />
          <br />
          {blogs.map((blog, index) => (
            <Blog
              key={blog.id}
              index={index}
              blog={blog}
              onDelete={() => {
                deleteBlog(blog)
              }}
              onLike={() => {
                increaseBlogLikes(blog)
              }}
            />
          ))}
        </div>
      )}
    </>
  )
}

export default App
