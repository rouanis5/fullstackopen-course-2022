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

export const addBlog = (blogObj, { onSuccess } = {}) => {
  return handler(async (dispatch) => {
    const result = await blogService.create(blogObj)
    dispatch(blogsActions.add(result))
    if (onSuccess) onSuccess(result)
  })
}

export const increaseBlogLikes = (oldBlog, { onSuccess } = {}) => {
  return handler(async (dispatch) => {
    const newBlog = await blogService.update(oldBlog.id, {
      likes: oldBlog.likes + 1
    })
    dispatch(blogsActions.update(newBlog))
    if (onSuccess) onSuccess(newBlog)
  })
}

export const deleteBlog = (blogToDelete, { onSuccess } = {}) => {
  return handler(async (dispatch) => {
    const isAllowed = window.confirm(`deleting ${blogToDelete.title} ?`)
    if (!isAllowed) return

    await blogService.remove(blogToDelete.id)
    dispatch(blogsActions.delete(blogToDelete.id))
    if (onSuccess) onSuccess(blogToDelete)
  })
}

export default blogsSlice.reducer
