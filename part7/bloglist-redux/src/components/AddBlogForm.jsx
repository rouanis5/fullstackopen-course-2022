import { useDispatch } from 'react-redux'
import { useField } from '../hooks'
import { notify } from '../reducers/notificationReducer'
import { addBlog } from '../reducers/blogsReducer'

const AddBlogForm = ({ toggleState }) => {
  const [toggle, toggler] = toggleState
  const dispatch = useDispatch()
  const [title, titleInput] = useField('text')
  const [author, authorInput] = useField('text')
  const [url, urlInput] = useField('text')

  const add = (e) => {
    e.preventDefault()
    const data = {
      title,
      author,
      url
    }
    dispatch(
      addBlog(data, {
        onSuccess: (newBlog) => {
          toggler()
          dispatch(
            notify(`a new blog ${newBlog.title} by ${newBlog.author} added`)
          )
        }
      })
    )

    Array.from([titleInput, authorInput, urlInput]).map((el) => el.clear())
  }

  if (!toggle) return
  return (
    <section className="my-8 max-w-2xl rounded-md bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="text-lg font-semibold capitalize text-gray-700 dark:text-white">
        Add Blog
      </h2>

      <form onSubmit={add}>
        <div className="mt-4 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {[
            ['Title', titleInput],
            ['Author', authorInput],
            ['URL', urlInput]
          ].map((el, i) => (
            <div key={i}>
              <label className="text-gray-700 dark:text-gray-200">
                {el[0]}
                <input
                  {...el[1].props}
                  className="mt-2 block w-full rounded-md border border-gray-200 bg-white px-4 py-2 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:focus:border-blue-300"
                />
              </label>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={toggler}
            className="transform rounded-md bg-red-600 px-8 py-2.5 leading-5 text-white transition-colors duration-300 hover:bg-red-700 focus:bg-red-700 focus:outline-none dark:bg-red-900"
          >
            close
          </button>
          <button
            type="submit"
            className="transform rounded-md bg-green-600 px-8 py-2.5 leading-5 text-white transition-colors duration-300 hover:bg-green-700 focus:bg-green-700 focus:outline-none dark:bg-green-900"
          >
            Save
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddBlogForm
