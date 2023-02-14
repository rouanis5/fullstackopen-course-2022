import { useDispatch, useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'
import {
  increaseBlogLikes,
  deleteBlog,
  commentBlog
} from '../reducers/blogsReducer'
import { notify } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import PropTypes from 'prop-types'
import Notfound from './Notfound'

const Blog = () => {
  const { id } = useParams()
  const [comment, commentField] = useField('text')
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

  const addComment = (e) => {
    e.preventDefault()
    console.log(comment)
    dispatch(
      commentBlog(blog.id, comment, {
        onSuccess: () => dispatch(notify(`comment added !`))
      })
    )
    commentField.clear()
  }

  if (!blog) return <Notfound />
  return (
    <div data-test="blog">
      <h2>
        {blog.title}{' '}
        <button type="button" onClick={remove} data-test="blog:delete">
          delete
        </button>
      </h2>
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
      <div>
        <h3>comments</h3>
        <form onSubmit={addComment}>
          <input {...commentField.props} />
          <button type="submit">add comment</button>
        </form>
        <ul>
          {blog?.comments.map((comment, index) => (
            <li key={`${comment} ${index}`}>{comment}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

Blog.prototype = {
  blog: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Blog
