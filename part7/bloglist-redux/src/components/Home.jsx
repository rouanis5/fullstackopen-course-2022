import { useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import AddBlogForm from './AddBlogForm'

const Home = () => {
  const [toggle, setToggle] = useState(false)
  const blogs = useSelector((state) =>
    Array.from(state.blogs).sort((a, b) => b.likes - a.likes)
  )
  const toggler = () => {
    setToggle(!toggle)
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl">
            recent posts
          </h2>

          <button
            onClick={toggler}
            className="transform rounded-lg px-2.5 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2"
          >
            {toggle ? 'Close' : 'Add'}
          </button>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <AddBlogForm toggleState={[toggle, toggler]} />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {blogs.map(({ id, title, author }, index) => (
            <div key={id}>
              <img
                className="h-64 w-full rounded-lg object-cover object-center lg:h-80"
                src={`https://picsum.photos/514/256?random=${index}`}
                alt={title}
              />
              <div className="mt-8">
                <span className="uppercase text-blue-500">category</span>

                <h3 className="mt-4 text-xl font-semibold capitalize text-gray-800 dark:text-white">
                  {title}
                </h3>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    by <span className="uppercase">{author}</span>
                  </p>
                  <Link
                    to={`/blogs/${id}`}
                    className="transform rounded-lg px-2.5 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2"
                  >
                    Read more
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Home
