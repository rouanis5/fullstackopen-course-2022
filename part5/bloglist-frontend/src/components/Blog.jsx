import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, onDelete, onLike }) => {
  const [visibile, setVisibile] = useState(false)
  const blogStyle = {
    padding: 12,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisibile(!visibile)
  }

  const increaseLike = (e) => {
    e.preventDefault()
    onLike()
  }

  const deleteBlog = (e) => {
    e.preventDefault()
    onDelete()
  }

  return (
    <div style={blogStyle}>
      {blog.title}
      {' '}
      <button type='button' onClick={toggleVisibility}>{visibile ? 'hide' : 'view'}</button>
      {visibile && (
        <>
          <ul>
            <li>{blog.url}</li>
            <li>
              likes {blog.likes}
              {' '}
              <button type='button' onClick={increaseLike}>like</button>
            </li>
            <li>{blog.author}</li>
          </ul>
          <button type='button' onClick={deleteBlog}>delete</button>
        </>
      )}
    </div>
  )
}

Blog.prototype = {
  onLike: PropTypes.func.isRequired
}

export default Blog
