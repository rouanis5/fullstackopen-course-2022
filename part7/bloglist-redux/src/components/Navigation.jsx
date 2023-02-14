import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { notify } from '../reducers/notificationReducer'
import { userLogout } from '../reducers/userReducer'
import { useState } from 'react'

const Navigation = () => {
  const [toggle, setToggle] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector((state) => state.user)
  const logout = (e) => {
    e.preventDefault()
    const { name } = user
    dispatch(
      userLogout({
        onSuccess: () => dispatch(notify(`${name} logout successfully !`))
      })
    )
    setToggle(false)
  }

  const toggler = () => {
    setToggle(!toggle)
  }

  const Logout = () => {
    return (
      <div className="mt-4">
        {user !== null && (
          <div>
            <span className="mr-5 text-gray-500 dark:text-gray-200">
              {user.name}
            </span>
            <button
              onClick={logout}
              className="transform rounded-lg bg-blue-600 px-6 py-2 font-medium capitalize tracking-wide text-white transition-colors duration-300 hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80"
            >
              logout
            </button>
          </div>
        )}
      </div>
    )
  }

  const Links = () => {
    return (
      <>
        {[
          ['blogs', '/'],
          ['users', '/users']
        ].map(([content, to], i) => (
          <Link
            key={i}
            to={to}
            onClick={() => setToggle(false)}
            className="transform rounded-lg px-2.5 py-2 text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2"
          >
            {content}
          </Link>
        ))}
      </>
    )
  }

  return (
    <nav className="relative bg-white shadow dark:bg-gray-800">
      <div className="container mx-auto px-6 py-3 md:flex">
        <div className="flex items-center justify-between">
          <Link
            className=" inline-block text-gray-900 dark:text-gray-300 "
            to="/"
          >
            BlogApp
          </Link>

          {/* <!-- Mobile menu button --> */}
          <div className="flex md:hidden">
            <button
              type="button"
              onClick={toggler}
              className="text-gray-500 hover:text-gray-600 focus:text-gray-600 focus:outline-none dark:text-gray-200 dark:hover:text-gray-400 dark:focus:text-gray-400"
              aria-label="toggle menu"
            >
              {!toggle ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 8h16M4 16h16"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* <!-- Mobile Menu open: "block", Menu closed: "hidden" --> */}
        <div className="absolute inset-x-0 z-20 hidden w-full translate-x-0 items-center justify-between bg-white p-0 px-6 py-4 opacity-100 transition-all duration-300 ease-in-out dark:bg-gray-800 md:relative md:top-0 md:mt-0 md:flex">
          <div className="mx-10 flex flex-row px-2 py-0">
            <Links />
          </div>
          <Logout />
        </div>
        {toggle && (
          <div className="absolute inset-x-0 z-20 w-full bg-white px-6 py-4 transition-all duration-300 ease-in-out dark:bg-gray-800 md:hidden">
            <div className="-mx-4 flex flex-col px-2">
              <Links />
            </div>
            <Logout />
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
