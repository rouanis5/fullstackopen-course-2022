import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { userLogin, userLogout } from './reducers/userReducer'
import { fetchBlogs } from './reducers/blogsReducer'
import { notify } from './reducers/notificationReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'

const App = () => {
  const dispatch = useDispatch()
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
          <Routes>
            <Route path="/">
              <Route index element={<Home />} />
              <Route path="blogs/:id" element={<Blog />} />
              <Route path="users">
                <Route index element={<Users />} />
                <Route path=":id" element={<User />} />
              </Route>
            </Route>
          </Routes>
        </div>
      )}
    </>
  )
}

export default App
