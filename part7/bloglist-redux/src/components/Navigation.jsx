import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/userReducer'

const navStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  background: '#dedede',
  padding: '10px'
}

const Navigation = () => {
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = (e) => {
    e.preventDefault()
    const { name } = user
    dispatch(
      userLogout({
        onSuccess: () => dispatch(notify(`${name} logout successfully !`))
      })
    )
  }

  return (
    <nav style={navStyle}>
      <div>
        <Link to="/" style={{ marginRight: '10px' }}>
          blogs
        </Link>
        <Link to="/users">users</Link>
      </div>
      {user !== null && (
        <div>
          {user.name} logged in
          <button onClick={logout}>logout</button>
        </div>
      )}
    </nav>
  )
}

export default Navigation
