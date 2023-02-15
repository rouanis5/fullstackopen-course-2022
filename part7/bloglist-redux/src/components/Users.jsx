import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
const Users = () => {
  const users = useSelector((state) =>
    [...state.users].sort((a, b) => b.blogs.length - a.blogs.length)
  )
  const currentUser = useSelector((state) => state.user?.username ?? '')
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <section className="container mx-auto px-4">
      <div className="flex items-center gap-x-3">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          Team members
        </h2>

        <span className="rounded-full bg-blue-100 px-3 py-1 text-xs text-blue-600 dark:bg-gray-800 dark:text-blue-400">
          {users.length} users
        </span>
      </div>

      <div className="mt-6 flex flex-col">
        <div className="-mx-4 -my-2 max-w-4xl overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Name</span>
                      </div>
                    </th>

                    <th
                      scope="col"
                      className="px-12 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Status</span>

                        <svg
                          className="h-3"
                          viewBox="0 0 10 11"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M2.13347 0.0999756H2.98516L5.01902 4.79058H3.86226L3.45549 3.79907H1.63772L1.24366 4.79058H0.0996094L2.13347 0.0999756ZM2.54025 1.46012L1.96822 2.92196H3.11227L2.54025 1.46012Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M0.722656 9.60832L3.09974 6.78633H0.811638V5.87109H4.35819V6.78633L2.01925 9.60832H4.43446V10.5617H0.722656V9.60832Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.1"
                          />
                          <path
                            d="M8.45558 7.25664V7.40664H8.60558H9.66065C9.72481 7.40664 9.74667 7.42274 9.75141 7.42691C9.75148 7.42808 9.75146 7.42993 9.75116 7.43262C9.75001 7.44265 9.74458 7.46304 9.72525 7.49314C9.72522 7.4932 9.72518 7.49326 9.72514 7.49332L7.86959 10.3529L7.86924 10.3534C7.83227 10.4109 7.79863 10.418 7.78568 10.418C7.77272 10.418 7.73908 10.4109 7.70211 10.3534L7.70177 10.3529L5.84621 7.49332C5.84617 7.49325 5.84612 7.49318 5.84608 7.49311C5.82677 7.46302 5.82135 7.44264 5.8202 7.43262C5.81989 7.42993 5.81987 7.42808 5.81994 7.42691C5.82469 7.42274 5.84655 7.40664 5.91071 7.40664H6.96578H7.11578V7.25664V0.633865C7.11578 0.42434 7.29014 0.249976 7.49967 0.249976H8.07169C8.28121 0.249976 8.45558 0.42434 8.45558 0.633865V7.25664Z"
                            fill="currentColor"
                            stroke="currentColor"
                            strokeWidth="0.3"
                          />
                        </svg>
                      </button>
                    </th>

                    <th
                      scope="col"
                      className="px-4 py-3.5 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                    >
                      <button className="flex items-center gap-x-2">
                        <span>Role</span>

                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="2"
                          stroke="currentColor"
                          className="h-4 w-4"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z"
                          />
                        </svg>
                      </button>
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 px-4 text-left text-sm font-normal text-gray-500 rtl:text-right dark:text-gray-400"
                    >
                      <div className="flex items-center gap-x-3">
                        <span>Achievments</span>
                      </div>
                    </th>
                    <th scope="col" className="relative py-3.5 px-4">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-700 dark:bg-gray-900">
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-gray-700">
                        <div className="inline-flex items-center gap-x-3">
                          <div className="flex items-center gap-x-2">
                            <img
                              className="h-10 w-10 rounded-full object-cover"
                              src={`https://i.pravatar.cc/150?img=${
                                index ?? 0
                              }`}
                              alt=""
                            />
                            <div>
                              <h2 className="font-medium capitalize text-gray-800 dark:text-white ">
                                {user.name}
                              </h2>
                              <p className="text-sm font-normal text-gray-600 dark:text-gray-400">
                                @{user.username}
                              </p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-12 py-4 text-sm font-medium text-gray-700">
                        <div
                          className={`inline-flex items-center gap-x-2 rounded-full ${
                            user.username === currentUser
                              ? 'bg-emerald-100/60'
                              : 'bg-red-100/60'
                          } px-3 py-1 dark:bg-gray-800`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              user.username === currentUser
                                ? 'bg-emerald-500'
                                : 'bg-red-500'
                            }`}
                          ></span>

                          <h2
                            className={`text-sm font-normal ${
                              user.username === currentUser
                                ? 'text-emerald-500'
                                : 'text-red-500'
                            }`}
                          >
                            {user.username === currentUser
                              ? 'Active'
                              : 'Offline'}
                          </h2>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                        Bloger
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm text-gray-500 dark:text-gray-300">
                        {user?.blogs.length ?? 0} Blogs
                      </td>
                      <td className="whitespace-nowrap px-4 py-4 text-sm">
                        <div className="flex items-center gap-x-6">
                          <Link
                            to={user.id}
                            className="text-gray-500 transition-colors duration-200 hover:text-yellow-500 focus:outline-none dark:text-gray-300 dark:hover:text-yellow-500"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="1em"
                              height="1em"
                              viewBox="0 0 24 24"
                              className="h-5 w-5"
                            >
                              <path
                                fill="currentColor"
                                d="M5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h7v2H5v14h14v-7h2v7q0 .825-.587 1.413Q19.825 21 19 21Zm4.7-5.3l-1.4-1.4L17.6 5H14V3h7v7h-2V6.4Z"
                              />
                            </svg>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Users
