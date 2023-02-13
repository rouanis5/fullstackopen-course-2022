import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBlogs } from '../reducers/blogsReducer'
import Blog from './Blog'
import AddBlogForm from './AddBlogForm'

const Home = () => {
  const dispatch = useDispatch()
  const blogs = useSelector((state) =>
    Array.from(state.blogs).sort((a, b) => b.likes - a.likes)
  )

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [dispatch])

  return (
    <div>
      <AddBlogForm />
      <br />
      {blogs.map((blog, index) => (
        <Blog key={blog.id} index={index} blog={blog} />
      ))}
    </div>
  )
}

export default Home
