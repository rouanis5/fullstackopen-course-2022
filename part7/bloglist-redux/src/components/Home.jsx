import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddBlogForm from './AddBlogForm'

const blogStyle = {
  display: 'block',
  padding: 12,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Home = () => {
  const blogs = useSelector((state) =>
    Array.from(state.blogs).sort((a, b) => b.likes - a.likes)
  )

  return (
    <div>
      <AddBlogForm />
      <br />
      {blogs.map(({ id, title, author }) => (
        <Link key={id} to={`blogs/${id}`} style={blogStyle}>
          {title} by {author}
        </Link>
      ))}
    </div>
  )
}

export default Home
