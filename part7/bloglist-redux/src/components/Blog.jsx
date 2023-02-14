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
  const Cover = ({ className, id }) => {
    return (
      <img
        className={`h-10 w-10 rounded-lg object-cover ${className ?? ''}`}
        src={`https://i.pravatar.cc/150?img=${id ?? 0}`}
        alt=""
      />
    )
  }
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center px-6 py-12 xl:flex-row">
        <div className="flex justify-center xl:w-1/2">
          <img
            className="h-80 w-80 flex-shrink-0 rounded-lg object-cover sm:h-[28rem] sm:w-[28rem]"
            src="https://dummyimage.com/720x600"
            alt=""
          />
        </div>

        <div className="mt-6 flex flex-col items-center xl:mt-0 xl:w-1/2 xl:items-start">
          <h2 className=" flex items-center gap-x-2 font-medium text-white">
            <span className=" text-2xl font-semibold capitalize tracking-tight xl:text-3xl">
              {blog.title}
            </span>
            <button
              className="rounded-full bg-red-500 py-0.5 px-1.5 text-xs"
              type="button"
              onClick={remove}
              data-test="blog:delete"
            >
              delete
            </button>
          </h2>
          <p className="text-xl capitalize tracking-tight text-gray-800 dark:text-white xl:text-2xl">
            written by {blog.author}
          </p>
          <p className="mt-4 block max-w-2xl text-gray-500 dark:text-gray-300">
            {blog.likes} likes !
          </p>

          <div className="mt-6 sm:-mx-2">
            <button
              onClick={increaseLike}
              className="mt-4 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white shadow transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:mx-2 sm:mt-0 sm:w-auto"
            >
              <span className="mx-2">Like</span>
            </button>
            <a
              href={blog.url}
              className="mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-2.5 text-sm text-white shadow transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:mx-2 sm:mt-0 sm:w-auto"
            >
              <span className="mx-2">Read More</span>
            </a>
          </div>
        </div>
      </div>
      <div className="container mx-auto space-y-2 px-6">
        <h2 className="text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl">
          Comments
        </h2>
        <hr className="my-8 border-gray-200 dark:border-gray-700" />
        <form className="mb-12 flex items-end gap-x-2" onSubmit={addComment}>
          <Cover className="h-16 w-16" id={blog?.comments.length} />
          <input
            {...commentField.props}
            className="mt-2 block w-full max-w-xl rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:placeholder-gray-500 dark:focus:border-blue-300"
          />
          <button
            className="mt-2 inline-flex w-full items-center justify-center overflow-hidden rounded-lg bg-blue-600 px-4 py-3 text-sm text-white shadow transition-colors duration-300 hover:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80 sm:mx-2 sm:mt-0 sm:w-auto"
            type="submit"
          >
            Send
          </button>
        </form>
        {blog?.comments.map((comment, index) => (
          <div key={index} className="flex items-center gap-x-2">
            <Cover id={index} />
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {comment}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

Blog.prototype = {
  blog: PropTypes.object,
  index: PropTypes.number.isRequired
}

export default Blog
