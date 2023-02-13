import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import { increaseBlogLikes, deleteBlog } from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import PropTypes from 'prop-types'

const Blog = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const blog = useSelector((state) =>
    state.blogs.find((blog) => blog.id === id)
  )

  const increaseLike = (e) => {
    e.preventDefault()
    dispatch(
      increaseBlogLikes(blog, {
        onSuccess: () =>
          dispatch(notify(`a like added to ${blog.title} by ${blog.author}`))
      })
    )
  }

  const remove = (e) => {
    e.preventDefault()
    dispatch(
      deleteBlog(blog, {
        onSuccess: () => {
          dispatch(notify(`${blog.title} is deleted !`))
          navigate('..')
        }
      })
    )
  }

  if (!blog) return
  return (
    <div data-test="blog">
      <ul>
        <li>{blog.url}</li>
        <li>
          likes {blog.likes}{' '}
          <button type="button" onClick={increaseLike} data-test="blog:like">
            like
          </button>
        </li>
        <li>{blog.author}</li>
      </ul>
      <button type="button" onClick={remove} data-test="blog:delete">
        delete
      </button>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Blog
