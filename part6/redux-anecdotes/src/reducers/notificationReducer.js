import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: ''
}

const notificatonSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    showNotification : (state, { payload }) => {
      state.message = payload
    },
    clearNotification: (state) => {
      state.message = ''
    }
  }
})

export const { showNotification, clearNotification } = notificatonSlice.actions
const notificationReducer = notificatonSlice.reducer
export default notificationReducer

let timer = null
export const notify = (message, delayInSeconds = 5) => {
  return async dispatch => {
    dispatch(showNotification(message))
    clearInterval(timer)
    timer = setTimeout(() => {
      dispatch(clearNotification())
    }, delayInSeconds * 1000)
  }
}
