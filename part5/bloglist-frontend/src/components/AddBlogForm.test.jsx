// extends Vitest's expect method with methods from react-testing-library
// import '@testing-library/jest-dom/extend-expect'
import matchers from '@testing-library/jest-dom/matchers'
expect.extend(matchers)
import userEvent from '@testing-library/user-event'
import AddBlogForm from './AddBlogForm'

import { render, cleanup } from '@testing-library/react'

// 5.16: Blog list tests, step4
// Make a test for the new blog form. The test should check,
// that the form calls the event handler it received as props
// with the right details when a new blog is created.

const blog = {
  id: '507f1f77bcf86cd799439011',
  title: 'my blog 1',
  author: 'the author 1',
  url: 'http://www.exemple.com/random-url',
  likes: 77
}

it('AddBlogForm component: on submit, props.onAdd is called and it passes the right parameters', async () => {
  // init mock function and userEvent
  const createBlog = vitest.fn()
  const user = userEvent.setup()

  // render component and click btn to display inputs
  const component = render(
    <AddBlogForm onAdd={createBlog} />
  )
  const findValueText = component.queryByDisplayValue
  const btn = component.queryByText('add blog')
  await user.click(btn)

  // initiate input and insert data
  const inputs = {
    title: component.queryByText('Title:').querySelector('input'),
    author: component.queryByText('Author:').querySelector('input'),
    url: component.queryByText('url:').querySelector('input')
  }
  await user.type(inputs.title, blog.title)
  await user.type(inputs.author, blog.author)
  await user.type(inputs.url, blog.url)

  // check if blog title appears on the screen before submitting
  expect(findValueText(blog.title)).toBeInTheDocument()

  // submit the form
  const submitBtn = component.container.querySelector('button[type="submit"]')
  await user.click(submitBtn)

  // check the if onAdd is called and received the right params
  const props = createBlog.mock.calls[0][0]
  expect(createBlog.mock.calls).toHaveLength(1)
  expect(props.title).toBe(blog.title)
  expect(props.author).toBe(blog.author)
  expect(props.url).toBe(blog.url)
  // check if blog title not appearing on the screen after submitting
  expect(findValueText(blog.title)).not.toBeInTheDocument()
})

afterEach(() => {
  cleanup()
})