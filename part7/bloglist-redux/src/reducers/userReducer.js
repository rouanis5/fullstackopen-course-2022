import { createSlice } from '@reduxjs/toolkit'
import { errorHandler as handler } from './notificationReducer'
import loginService from '../services/login'
import blogService from '../services/blogs'
import constants from '../config/constants'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      return payload
    },
    resetUser: () => {
      return null
    }
  }
})

const { setUser, resetUser } = userSlice.actions
export const userLogin = (userObj = null, { onSuccess } = {}) => {
  return handler(async (dispatch) => {
    let user = null
    if (userObj) {
      // on first login
      user = await loginService.login(userObj)
      window.localStorage.setItem(
        constants.userLocalStorage,
        JSON.stringify(user)
      )
    } else {
      // get user info from localStorage
      const localStorage = window.localStorage.getItem(
        constants.userLocalStorage
      )
      if (!localStorage) return
      user = JSON.parse(localStorage)
    }

    dispatch(setUser(user))
    blogService.setToken(user.token)
    if (onSuccess) onSuccess(user)
  })
}

export const userLogout = ({ onSuccess } = {}) => {
  return handler(async (dispatch) => {
    dispatch(resetUser())
    window.localStorage.removeItem(constants.userLocalStorage)
    blogService.setToken(null)
    if (onSuccess) onSuccess()
  })
}

export default userSlice.reducer
