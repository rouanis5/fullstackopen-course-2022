import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TodoList from './List'

test('renders content', () => {
  const todos =
    [
      {
        _id: 1,
        text: 'Hello World',
        done: true
      }
    ]

    const onClickComplete = jest.fn()
    const onClickDelete = jest.fn()

  const view = render(
    <TodoList todos={todos} onClickComplete={onClickComplete} onClickDelete={onClickDelete} />
    )

  expect(view.container).toHaveTextContent(
    'Hello World'
  )
})
