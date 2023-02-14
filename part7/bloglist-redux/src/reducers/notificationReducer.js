import { createSlice } from '@reduxjs/toolkit'
const initialState = {
  content: '',
  type: 'success'
}
export const notificationTypes = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const notificationSlice = createSlice({
  initialState,
  name: 'notification',
  reducers: {
    setNotificationType: (state, { payload }) => {
      state.type = payload
    },
    showNotification: (state, { payload }) => {
      state.content = payload
    },
    clearNotification: (state) => {
      state.content = ''
    }
  }
})

const { showNotification, clearNotification, setNotificationType } =
  notificationSlice.actions

let notifTimer = null
const setNotification = (content, type, delayInSeconds) => {
  return async (dispatch) => {
    dispatch(setNotificationType(type))
    dispatch(showNotification(content))
    clearTimeout(notifTimer)
    notifTimer = setTimeout(() => {
      dispatch(clearNotification())
    }, delayInSeconds * 1000)
  }
}

export const notify = (content, delayInSeconds = 4) =>
  setNotification(content, notificationTypes.SUCCESS, delayInSeconds)

export const alert = (content, delayInSeconds = 4) =>
  setNotification(content, notificationTypes.ERROR, delayInSeconds)

export const errorHandler = (callback) => {
  return async (dispatch) => {
    try {
      await callback(dispatch)
    } catch (error) {
      const msg = error?.response?.data?.error || 'something went wrong'
      console.error(msg)
      dispatch(alert(msg))
    }
  }
}

export default notificationSlice.reducer
