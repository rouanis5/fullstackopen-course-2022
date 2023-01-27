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
    hideNotification: (state) => {
      state.message = ''
    }
  }
})

export const { showNotification, hideNotification } = notificatonSlice.actions
const notificationReducer = notificatonSlice.reducer
export default notificationReducer
