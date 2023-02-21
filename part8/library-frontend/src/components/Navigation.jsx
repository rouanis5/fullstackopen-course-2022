import { Link } from 'react-router-dom'

const Navigation = ({ token, logout }) => {
  return (
    <div>
      <Link to="/">
        <button>authors</button>
      </Link>
      <Link to="/books">
        <button>books</button>
      </Link>
      {token ? (
        <>
          <Link to="/recommand">
            <button>recommand</button>
          </Link>
          <Link to="/add">
            <button>add book</button>
          </Link>
          <button onClick={logout}>logout</button>
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
