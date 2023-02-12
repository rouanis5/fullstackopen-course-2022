import { useReducer, useContext, createContext } from 'react'

export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error'
}

const initialState = {
  content: '',
  type: NOTIFICATION_TYPES.SUCCESS
}

const NOTIFICATION_ACTIONS = {
  HIDE: 'HIDE_NOTIFICATION',
  NOTIFY: 'SUCCESS_NOTIFICATION',
  ALERT: 'ALERT_NOTIFICATION'
}

const notificationReducer = (state, { type, payload }) => {
  switch (type) {
    case NOTIFICATION_ACTIONS.HIDE:
      return { ...state, content: '' }
    case NOTIFICATION_ACTIONS.NOTIFY:
      return { content: payload, type: NOTIFICATION_TYPES.SUCCESS }
    case NOTIFICATION_ACTIONS.ALERT:
      return { content: payload, type: NOTIFICATION_TYPES.ERROR }
    default:
      return state
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    initialState
  )

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch]}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

let timer
const defaultDelay = 2
const useNotificationHook = () => {
  const dispatch = useNotificationDispatch()
  return (actionType, content, delayInSeconds) => {
    dispatch({ type: actionType, payload: content })
    clearInterval(timer)
    timer = setTimeout(() => {
      dispatch({ type: NOTIFICATION_ACTIONS.HIDE })
    }, delayInSeconds * 1000)
  }
}

export const useNotify = () => {
  const hook = useNotificationHook()
  return (content, delayInSeconds = defaultDelay) => {
    hook(NOTIFICATION_ACTIONS.NOTIFY, content, delayInSeconds)
  }
}

export const useAlert = () => {
  const hook = useNotificationHook()
  return (content, delayInSeconds = defaultDelay) => {
    hook(NOTIFICATION_ACTIONS.ALERT, content, delayInSeconds)
  }
}

export default NotificationContext
