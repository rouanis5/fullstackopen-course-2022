import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector((state) =>
    [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <Link to={user.id}>{user.name}</Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Users
