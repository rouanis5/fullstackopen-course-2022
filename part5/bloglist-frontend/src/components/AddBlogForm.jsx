import React, { useState } from 'react'
import Togglable from './Togglable'

const AddBlogForm = ({ onAdd }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()

    onAdd({
      title,
      author,
      url
    })

    setAuthor('')
    setTitle('')
    setUrl('')
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
