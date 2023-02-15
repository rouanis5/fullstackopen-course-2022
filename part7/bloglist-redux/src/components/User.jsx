import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Notfound from './Notfound'
import BlogCard from './BlogCard'

const User = () => {
  const { id } = useParams()
  const user = useSelector((state) =>
    state.users.find((user) => user.id === id)
  )
  if (!user) return <Notfound />

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container mx-auto my-10 px-6">
        <div className="flex items-center gap-x-5">
          <img
            className="h-16 w-16 rounded-full object-cover"
            src="https://i.pravatar.cc/150?img=0"
            alt=""
          />
          <div>
            <h2 className="text-2xl font-semibold capitalize text-gray-800 dark:text-white lg:text-3xl">
              {user.name} blogs ({user?.blogs.length ?? 0})
            </h2>
            <span>@{user.username}</span>
          </div>
        </div>

        <hr className="my-8 border-gray-200 dark:border-gray-700" />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
          {user.blogs.map((blog, index) => (
            <BlogCard key={blog.id} blog={blog} id={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default User
