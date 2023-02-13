import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { increaseBlogLikes, deleteBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const blogStyle = {
  padding: 12,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}

const Blog = ({ blog, index }) => {
  const [visibile, setVisibile] = useState(false)
  const dispatch = useDispatch()

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisibile(!visibile)
  }

  const increaseLike = (e) => {
    e.preventDefault()
    dispatch(
      increaseBlogLikes(blog, {
        onSuccess: dispatch(
          notify(`a like added to ${blog.title} by ${blog.author}`)
        )
      })
    )
  }

  const remove = (e) => {
    e.preventDefault()
    dispatch(
      deleteBlog(blog, {
        onSuccess: dispatch(notify(`${blog.title} is deleted !`))
      })
    )
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
          <button type="button" onClick={remove} data-test="blog:delete">
            delete
          </button>
        </>
      )}
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Blog
