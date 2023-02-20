import { Link } from 'react-router-dom'

const Navigation = ({ user }) => {
  return (
    <div>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      {user ? (
        <>
          <Link to="/add">
            <button>add book</button>
          </Link>
          <Link to="/aha">
            <button>logout</button>
          </Link>
        </>
      ) : (
        <Link to="/login">
          <button>login</button>
        </Link>
      )}
    </div>
  )
}

export default Navigation
