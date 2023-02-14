import { useParams, Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notfound from './Notfound'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )
  if (!user) <Notfound />

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map(({ id, title }) => (
          <li key={id}>
            <Link to={`/blogs/${id}`}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default User
