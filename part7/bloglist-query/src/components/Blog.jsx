import { useState } from 'react'
import { useCustomMutation } from '../hooks'
import blogService from '../services/blogs'
import { useNotify } from '../contexts/notificationContext'
import PropTypes from 'prop-types'

const blogStyle = {
  padding: 12,
  border: 'solid',
  borderWidth: 1,
  marginBottom: 5
}
const Blog = ({ blog, index }) => {
  const [visibile, setVisibile] = useState(false)
  const notify = useNotify()

  const like = useCustomMutation(blogService.update, (queryClient, newBlog) => {
    notify(`a like added to ${blog.title} by ${blog.author}`)
    queryClient.setQueryData(['blogs'], (blogs) =>
      blogs.map((b) => (b.id === newBlog.id ? newBlog : b))
    )
  })

  const remove = useCustomMutation(blogService.remove, (queryClient) => {
    notify(`${blog.title} is deleted !`)
    queryClient.setQueryData(['blogs'], (blogs) =>
      blogs.filter((b) => b.id !== blog.id)
    )
  })

  const toggleVisibility = (e) => {
    e.preventDefault()
    setVisibile(!visibile)
  }

  const increaseLike = (e) => {
    e.preventDefault()
    like.mutate({ id: blog.id, newObject: { likes: blog.likes + 1 } })
  }

  const deleteBlog = (e) => {
    e.preventDefault()
    const isAllowed = window.confirm(`deleting ${blog.title} ?`)
    if (!isAllowed) return
    remove.mutate(blog.id)
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
