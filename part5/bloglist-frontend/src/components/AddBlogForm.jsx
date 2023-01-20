import React, { useState } from 'react'
import blogService from '../services/blogs'

const AddBlogForm = ({ onSuccess }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      const result = await blogService.create({ title, author, url })
      setAuthor('')
      setTitle('')
      setUrl('')
      onSuccess((previousBlogs) => [...previousBlogs, result])
    } catch (exception) {
      console.error(exception.response.data.error)
    }
  }
  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={(e) => { addBlog(e) }}>
        <label>
          Title
          <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
        </label>
        <br />
        <label>
          Author
          <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value) }} />
        </label>
        <br />
        <label>
          url
          <input type="text" value={url} onChange={(e) => { setUrl(e.target.value) }} />
        </label>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AddBlogForm
