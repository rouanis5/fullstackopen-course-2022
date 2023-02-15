import { useField } from '../hooks'
import { useDispatch } from 'react-redux'
import { userLogin } from '../reducers/userReducer'
import { notify } from '../reducers/notificationReducer'

const LoginForm = () => {
  const [username, usernameInput] = useField('text')
  const [password, passwordInput] = useField('password')
  const dispatch = useDispatch()

  const resetForm = () => {
    Array.from([usernameInput, passwordInput]).map((el) => el.clear())
  }
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
    resetForm()
  }

  return (
    <section className="container mx-auto flex min-h-[calc(100vh-10em)] items-center px-6 py-6">
      <div className="mx-auto flex max-w-sm flex-col items-center text-center">
        <p className="rounded-full bg-blue-50 p-3 text-sm font-medium text-blue-500 dark:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="h-6 w-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </p>
        <h1 className="mt-3 text-2xl font-semibold text-gray-800 dark:text-white md:text-3xl">
          Log in to application
        </h1>
        <p className="mt-4 text-gray-500 dark:text-gray-400">
          The page you are looking for does not exist. Here are some helpful
          links:
        </p>

        <form onSubmit={login} className="mt-8 w-full" data-test="login:form">
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
          <div className="mx-auto mt-6 flex w-full shrink-0 items-center gap-x-3">
            <button
              type="reset"
              onClick={resetForm}
              className="flex w-1/2 items-center justify-center gap-x-2 rounded-lg border bg-white px-5 py-2 text-sm text-gray-700 transition-colors duration-200 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:hover:bg-gray-800"
            >
              <span>Clear</span>
            </button>

            <button
              type="submit"
              className="w-1/2 shrink-0 rounded-lg bg-blue-500 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-500"
              data-test="login:submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default LoginForm
