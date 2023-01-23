// extends Vitest's expect method with methods from react-testing-library
// import '@testing-library/jest-dom/extend-expect'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)

import { render, screen, cleanup, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blog = {
  id: '507f1f77bcf86cd799439011',
  title: 'my blog 1',
  author: 'the author 1',
  url: 'http://www.exemple.com/random-url',
  likes: 77
}

it('renders only the blog title, if the view button was not clicked',() => {

  render(
    <Blog blog={blog} />
  )
  const title = screen.queryByText(blog.title)
  const author = screen.queryByText(blog.author)
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(`likes ${blog.likes}`)

  expect(title).toBeInTheDocument()
  expect(author).not.toBeInTheDocument()
  expect(url).not.toBeInTheDocument()
  expect(likes).not.toBeInTheDocument()
})

it('renders the blogs title, author, likes and URL, after the view button is clicked',() => {
  render(
    <Blog blog={blog} />
  )
  const btn = screen.queryByText('view')

  // using fireEvent instead of UserEvent
  fireEvent.click(btn)

  const title = screen.queryByText(blog.title)
  const author = screen.queryByText(blog.author)
  const url = screen.queryByText(blog.url)
  const likes = screen.queryByText(`likes ${blog.likes}`)

  expect(title).toBeInTheDocument()
  expect(author).toBeInTheDocument()
  expect(url).toBeInTheDocument()
  expect(likes).toBeInTheDocument()
})

it('ensures that if the like button is clicked twice, the event handler the component received as props is called twice', () => {
  const handleClick = vitest.fn()
  render(
    <Blog blog={blog} onLike={handleClick} />
  )
  const viewBtn = screen.queryByText('view')
  fireEvent.click(viewBtn)

  const likeBtn = screen.queryByRole('button', { name: 'like' })
  fireEvent.click(likeBtn)
  fireEvent.click(likeBtn)

  expect(handleClick.mock.calls).toHaveLength(2)
})

afterEach(() => {
  cleanup()
})