import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addBlog } from '../reducers/blogsReducer'
import Togglable from './Togglable'

const AddBlogForm = () => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()

  const add = (e) => {
    e.preventDefault()

    dispatch(
      addBlog({
        title,
        author,
        url
      })
    )

    setAuthor('')
    setTitle('')
    setUrl('')
  }
  return (
    <Togglable buttonLabel="add blog">
      <h2>Create new</h2>
      <form onSubmit={add}>
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
