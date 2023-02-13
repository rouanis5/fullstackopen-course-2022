import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from './reducers/blogsReducer'
import { userLogin, userLogout } from './reducers/userReducer'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import AddBlogForm from './components/AddBlogForm'
import Notification from './components/Notification'
import { notify } from './reducers/notificationReducer'

const App = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) =>
    Array.from(state.blogs).sort((a, b) => b.likes - a.likes)
  )
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(userLogin())
    dispatch(fetchBlogs())
  }, [dispatch])

  const logout = (e) => {
    e.preventDefault()
    dispatch(
      userLogout({
        onSuccess: dispatch(notify(`${user.name} logout successfully !`))
      })
    )
  }

  return (
    <>
      <h1>blogs</h1>
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <div>
          <div>
            {user.name} logged in
            <button onClick={logout}>logout</button>
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
