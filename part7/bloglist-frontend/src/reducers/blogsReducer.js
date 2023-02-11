import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { errorHandler as handler } from './notificationReducer'
const initialState = []

const blogsSlice = createSlice({
  initialState,
  name: 'blogs',
  reducers: {
    setBlogs: (state, { payload }) => {
      return payload
    },
    pushBlog: (state, { payload }) => {
      state.push(payload)
    },
    updateBlog: (state, { payload: { id, updatedBlog } }) => {
      return state.map((blog) => (blog.id === id ? updatedBlog : blog))
    }
  }
})

const { setBlogs, pushBlog } = blogsSlice.actions

export const fetchBlogs = () => {
  return handler(async (dispatch) => {
    const data = await blogService.getAll()
    dispatch(setBlogs(data))
  })
}
export const addBlog = (blogObj) => {
  return handler(async (dispatch, notify) => {
    const result = await blogService.create(blogObj)
    dispatch(pushBlog(result))
    dispatch(notify(`a new blog ${result.title} by ${result.author} added`))
  })
}

export default blogsSlice.reducer
