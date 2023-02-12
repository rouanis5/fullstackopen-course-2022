import { useField } from '../hooks'
import Togglable from './Togglable'

const AddBlogForm = ({ onAdd }) => {
  const [title, titleInput] = useField('text')
  const [author, authorInput] = useField('text')
  const [url, urlInput] = useField('text')

  const addBlog = (e) => {
    e.preventDefault()

    onAdd({
      title,
      author,
      url
    })

    Array.from([titleInput, authorInput, urlInput]).map((el) => el.clear())
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
