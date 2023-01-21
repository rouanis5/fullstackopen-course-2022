import React, { useState } from 'react'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const AddBlogForm = ({ onSuccess, onNotify }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = async (e) => {
    e.preventDefault()
    try {
      const result = await blogService.create({ title, author, url })
      onSuccess((previousBlogs) => [...previousBlogs, result])
      onNotify(`a new blog ${title} by ${author} added`)
      setAuthor('')
      setTitle('')
      setUrl('')
    } catch (exception) {
      onNotify(exception.response.data.error, 'error')
      console.error(exception.response.data.error)
    }
  }
  return (
    <Togglable buttonLabel="add blog">
      <h2>Create new</h2>
      <form onSubmit={(e) => { addBlog(e) }}>
        <div>
          <label>
            Title:
            <input type="text" value={title} onChange={(e) => { setTitle(e.target.value) }} />
          </label>
          <br />
          <label>
            Author:
            <input type="text" value={author} onChange={(e) => { setAuthor(e.target.value) }} />
          </label>
          <br />
          <label>
            url:
            <input type="text" value={url} onChange={(e) => { setUrl(e.target.value) }} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </Togglable>
  )
}

export default AddBlogForm
