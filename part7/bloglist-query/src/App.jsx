import { useState, useEffect } from 'react'
import { useAlert, useNotify } from './contexts/notificationContext'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import constants from './config/constants'
import Notification from './components/Notification'

const App = () => {
  const query = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })
  const blogs = query.data || []

  const [user, setUser] = useState(null)
  const notify = useNotify()
  const alert = useAlert()

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
    notify(`${name} logout successfully !`)
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
      notify(`${user.name} login`)
    } catch (exception) {
      alert(exception.response.data.error)
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
            <button onClick={logout}>logout</button>
          </div>
          <AddBlogForm />
          <br />
          {blogs
            .sort((a, b) => b.likes - a.likes)
            .map((blog, index) => (
              <Blog key={blog.id} index={index} blog={blog} />
            ))}
        </div>
      )}
    </>
  )
}

export default App
