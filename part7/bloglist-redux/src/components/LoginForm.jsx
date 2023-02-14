import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, usernameInput] = useField('text')
  const [password, passwordInput] = useField('password')
  const dispatch = useDispatch()

  const login = (e) => {
    e.preventDefault()
    const data = {
      username,
      password
    }
    dispatch(
      userLogin(data, {
        onSuccess: (user) => {
          dispatch(notify(`${user.name} login`))
        }
      })
    )

    Array.from([usernameInput, passwordInput]).map((el) => el.clear())
  }

  return (
    <section className="container mx-auto p-6">
      <h3 className="text-lg text-gray-900 dark:text-gray-300">
        Log in to application
      </h3>
      <form onSubmit={login} className="my-10 max-w-md" data-test="login:form">
        {[
          ['Username', usernameInput, 'wanis2023'],
          ['Password', passwordInput, '******']
        ].map(([name, input, placeholder], i) => (
          <div key={i} className="mb-3">
            <div className="flex items-center justify-between">
              <label
                htmlFor={name}
                className="block text-sm text-gray-500 dark:text-gray-300"
              >
                {name}
              </label>
            </div>
            <div className="relative mt-2 flex items-center">
              <input
                {...input.props}
                id={name}
                placeholder={placeholder}
                className="block w-full rounded-lg border border-gray-200 bg-white py-2.5 px-5 text-gray-700 placeholder-gray-400/70 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 rtl:pr-5 rtl:pl-11 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:focus:border-blue-300"
              />
            </div>
          </div>
        ))}

        <button
          className="transform rounded-lg bg-blue-600 px-6 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
          type="submit"
          data-test="login:submit"
        >
          login
        </button>
      </form>
    </section>
  )
}

export default LoginForm
