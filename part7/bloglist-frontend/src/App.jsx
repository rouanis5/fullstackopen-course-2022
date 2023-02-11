import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { alert, notify } from './reducers/notificationReducer'
import { fetchBlogs } from './reducers/blogsReducer'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import constants from './config/constants'
import Notification from './components/Notification'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) =>
    Array.from(state.blogs).sort((a, b) => b.likes - a.likes)
  )
  const [user, setUser] = useState(null)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

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
          <AddBlogForm />
          <br />
          {blogs.map((blog, index) => (
            <Blog key={blog.id} index={index} blog={blog} />
          ))}
        </div>
      )}
    </>
  )
}

export default App
