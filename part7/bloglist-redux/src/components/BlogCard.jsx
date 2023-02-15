import { Link } from 'react-router-dom'

const BlogCard = ({ blog, id }) => {
  return (
    <div>
      <img
        className="h-64 w-full rounded-lg object-cover object-center lg:h-80"
        src={`https://picsum.photos/514/256?random=${id}`}
        alt={blog.title}
      />
      <div className="mt-8">
        <span className="uppercase text-blue-500">category</span>

        <h3 className="mt-4 text-xl font-semibold capitalize text-gray-800 dark:text-white">
          {blog.title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            by <span className="uppercase">{blog.author}</span>
          </p>
          <Link
            to={`/blogs/${blog.id}`}
            className="transform rounded-lg px-2.5 py-2 font-medium text-gray-700 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-700 md:mx-2"
          >
            Read more
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
