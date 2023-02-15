import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Routes, Route } from 'react-router-dom'
import { userLogin } from './reducers/userReducer'
import { fetchBlogs } from './reducers/blogsReducer'
import { fetchUsers } from './reducers/usersReducer'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Home from './components/Home'
import Users from './components/Users'
import User from './components/User'
import Blog from './components/Blog'
import Navigation from './components/Navigation'
import Footer from './components/Footer'
import Notfound from './components/Notfound'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)

  useEffect(() => {
    dispatch(
      userLogin(null, {
        onSuccess: () => {
          dispatch(fetchBlogs())
          dispatch(fetchUsers())
        }
      })
    )
  }, [dispatch])

  return (
    <>
      <Navigation />
      <Notification />
      {user === null ? (
        <LoginForm />
      ) : (
        <Routes>
          <Route path="/">
            <Route index element={<Home />} />
            <Route path="blogs/:id" element={<Blog />} />
            <Route path="users">
              <Route index element={<Users />} />
              <Route path=":id" element={<User />} />
            </Route>
            <Route path="*" element={<Notfound />} />
          </Route>
        </Routes>
      )}
      <Footer />
    </>
  )
}

export default App
