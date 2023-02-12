import { useEffect } from 'react'
import { useAlert, useNotify } from './contexts/notificationContext'
import { useLogout, useUserValue, useLogin } from './contexts/UserContext'
import { useQuery } from '@tanstack/react-query'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'

const App = () => {
  const query = useQuery({ queryKey: ['blogs'], queryFn: blogService.getAll })
  const blogs = query.data || []

  const user = useUserValue()
  const userLogout = useLogout()
  const userLogin = useLogin()
  const notify = useNotify()
  const alert = useAlert()

  useEffect(() => {
    userLogin()
  }, [userLogin])

  const logout = (e) => {
    e.preventDefault()
    const { name } = user
    userLogout()
    notify(`${name} logout successfully !`)
  }

  const login = (userObj) => {
    userLogin(userObj, {
      onSuccess: (user) => {
        notify(`${user.name} login`)
      },
      onError: (exception) => {
        const msg = exception.response.data.error || 'something went wrong'
        alert(msg)
        console.error(msg)
      }
    })
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
