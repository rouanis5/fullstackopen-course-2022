import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { errorHandler as handler } from './notificationReducer'
const initialState = []

const blogsSlice = createSlice({
  initialState,
  name: 'blogs',
  reducers: {
    set: (state, { payload }) => {
      return payload
    },
    add: (state, { payload }) => {
      state.push(payload)
    },
    update: (state, { payload }) => {
      return state.map((blog) => (blog.id === payload.id ? payload : blog))
    },
    delete: (state, { payload }) => {
      return state.filter((blog) => blog.id !== payload)
    }
  }
})

const blogsActions = blogsSlice.actions

export const fetchBlogs = () => {
  return handler(async (dispatch) => {
    const data = await blogService.getAll()
    dispatch(blogsActions.set(data))
  })
}

export const addBlog = (blogObj) => {
  return handler(async (dispatch, notify) => {
    const result = await blogService.create(blogObj)
    dispatch(blogsActions.add(result))
    dispatch(notify(`a new blog ${result.title} by ${result.author} added`))
  })
}

export const increaseBlogLikes = (oldBlog) => {
  return handler(async (dispatch, notify) => {
    const newBlog = await blogService.update(oldBlog.id, {
      likes: oldBlog.likes + 1
    })
    dispatch(blogsActions.update(newBlog))
    dispatch(notify(`a like added to ${oldBlog.title} by ${oldBlog.author}`))
  })
}

export const deleteBlog = (blogToDelete) => {
  return handler(async (dispatch, notify) => {
    const isAllowed = window.confirm(`deleting ${blogToDelete.title} ?`)
    if (!isAllowed) return

    await blogService.remove(blogToDelete.id)
    dispatch(blogsActions.delete(blogToDelete.id))
    dispatch(notify(`${blogToDelete.title} is deleted !`))
  })
}

export default blogsSlice.reducer
