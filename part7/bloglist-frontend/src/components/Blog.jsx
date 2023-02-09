import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, index, onDelete, onLike }) => {
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
    <div style={blogStyle} data-test="blog">
      <div>
        <span data-test="blog:title">{blog.title} </span>
        <button type="button" onClick={toggleVisibility}>
          {visibile ? 'hide' : 'view'}
        </button>
      </div>
      {visibile && (
        <>
          {(index === 0 || index === 1) && (
            <b>The {index === 1 ? 'second ' : ''}most liked</b>
          )}
          <ul>
            <li>{blog.url}</li>
            <li>
              likes {blog.likes}{' '}
              <button
                type="button"
                onClick={increaseLike}
                data-test="blog:like"
              >
                like
              </button>
            </li>
            <li>{blog.author}</li>
          </ul>
          <button type="button" onClick={deleteBlog} data-test="blog:delete">
            delete
          </button>
        </>
      )}
    </div>
  )
}

Blog.prototype = {
  onLike: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  blog: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Blog
