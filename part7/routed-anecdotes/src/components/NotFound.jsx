import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div>
      <h2>Page Not Foud 404</h2>
      <p>go back to <Link to='/'>home page</Link></p>
    </div>
  )
}

export default NotFound
