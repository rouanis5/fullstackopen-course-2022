import { createSlice } from '@reduxjs/toolkit'
import { getAll } from '../services/users'
import { errorHandler as handler } from './notificationReducer'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    set: (state, { payload }) => {
      return payload
    }
  }
})

export const fetchUsers = () => {
  return handler(async (dispatch) => {
    const users = await getAll()
    dispatch(usersSlice.actions.set(users))
  })
}

export default usersSlice.reducer
