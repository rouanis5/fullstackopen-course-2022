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
      <form
        onSubmit={(e) => {
          addBlog(e)
        }}
      >
        <div>
          <label>
            Title:
            <input
              type="text"
              value={title}
              data-test="blogForm:title"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
            />
          </label>
          <br />
          <label>
            Author:
            <input
              type="text"
              value={author}
              data-test="blogForm:author"
              onChange={(e) => {
                setAuthor(e.target.value)
              }}
            />
          </label>
          <br />
          <label>
            url:
            <input
              type="text"
              value={url}
              data-test="blogForm:url"
              onChange={(e) => {
                setUrl(e.target.value)
              }}
            />
          </label>
        </div>
        <button type="submit" data-test="blogForm:submit">
          create
        </button>
      </form>
    </Togglable>
  )
}

export default AddBlogForm
