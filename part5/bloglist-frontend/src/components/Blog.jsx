import { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, onNotify, onDelete, onUpdate }) => {
  const [visibile, setVisibile] = useState(false)
  const [blogData, setBlogData] = useState(blog)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  const toggleVisibility = () => {
    setVisibile(!visibile)
  }

  const increaseLike = async () => {
    try {
      const updatedBlog = await blogService.update(blogData.id, { likes: blogData.likes + 1 })
      onNotify(`a like added to ${blogData.title} by ${blogData.author}`)
      onUpdate(updatedBlog)
      setBlogData(updatedBlog)
    } catch (exception) {
      onNotify(exception.response.data.error, 'error')
      console.error(exception.response.data.error)
    }
  }

  const deleteBlog = async () => {
    const isAllowed = window.confirm(`deleting ${blogData.title} ?`)
    if (!isAllowed) return

    try {
      await blogService.remove(blogData.id)
      onDelete()
    } catch (exception) {
      onNotify(exception.response.data.error, 'error')
      console.error(exception.response.data.error)
    }
  }

  return (
    <div style={blogStyle}>
      {blogData.title}
      {' '}
      <button onClick={toggleVisibility}>{visibile ? 'hide' : 'view'}</button>
      {visibile && (
        <>
          <ul>
            <li>{blogData.url}</li>
            <li>
              likes {blogData.likes}
              {' '}
              <button onClick={increaseLike}>like</button>
            </li>
            <li>{blogData.author}</li>
          </ul>
          <button onClick={deleteBlog}>delete</button>
        </>
      )}
    </div>
  )
}

export default Blog
