const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <div className="container mx-auto flex flex-col items-center justify-between px-6 py-8 lg:flex-row">
        <a href="#">
          <div className="px-8 py-2 text-center text-xl font-bold text-blue-500">
            WANIS
          </div>
        </a>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 lg:mt-0 lg:gap-6">
          {[
            'Overview',
            'features',
            'pricing',
            'careers',
            'help',
            'privacy'
          ].map((content, i) => (
            <a
              key={i}
              href="#"
              className="text-sm text-gray-600 transition-colors duration-300 hover:text-blue-500 dark:text-gray-200 dark:hover:text-blue-400"
            >
              {content}
            </a>
          ))}
        </div>
        <p className="mt-6 text-sm text-gray-500 dark:text-gray-400 lg:mt-0">
          © Copyright 2023 Wanis.{' '}
        </p>
      </div>
    </footer>
  )
}

export default Footer
