import { useField, useCustomMutation } from '../hooks'
import { useNotify } from '../contexts/notificationContext'
import blogService from '../services/blogs'
import Togglable from './Togglable'

const AddBlogForm = () => {
  const [title, titleInput] = useField('text')
  const [author, authorInput] = useField('text')
  const [url, urlInput] = useField('text')
  const notify = useNotify()

  const addBlog = useCustomMutation(
    blogService.create,
    (queryClient, newBlog) => {
      notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
      // queryClient.invalidateQueries({ queryKey: ['blogs'] })
      queryClient.setQueryData(['blogs'], (blogs) => blogs.concat(newBlog))
    }
  )

  const add = (e) => {
    e.preventDefault()

    addBlog.mutate({
      title,
      author,
      url
    })

    Array.from([titleInput, authorInput, urlInput]).map((el) => el.clear())
  }
  return (
    <Togglable buttonLabel="add blog">
      <h2>Create new</h2>
      <form onSubmit={add}>
        <div>
          <label>
            Title:
            <input {...titleInput.props} data-test="blogForm:title" />
          </label>
          <br />
          <label>
            Author:
            <input {...authorInput.props} data-test="blogForm:author" />
          </label>
          <br />
          <label>
            url:
            <input {...urlInput.props} data-test="blogForm:url" />
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
