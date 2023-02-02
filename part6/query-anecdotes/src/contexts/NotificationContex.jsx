import { useReducer, useContext, createContext } from "react";

export const NOTIFICATION_ACTION_TYPES = {
  SHOW: 'SHOW_NOTIFICATION',
  HIDE: 'HIDE_NOTIFICATION'  
}

const notificationReducer = (state, {type, payload}) => {
  switch (type) {
    case NOTIFICATION_ACTION_TYPES.SHOW:
      return payload
    case NOTIFICATION_ACTION_TYPES.HIDE:
      return ''
    default:
      return state
  }
}

const NotificationContext = createContext()

let timer
export const NotificationContextProvider = ({ children }) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  const notify = (content, delayInSeconds = 2) => {
    notificationDispatch({type: NOTIFICATION_ACTION_TYPES.SHOW, payload: content})
    clearInterval(timer)
    timer = setTimeout(() => {
      notificationDispatch({ type: NOTIFICATION_ACTION_TYPES.HIDE })
    }, delayInSeconds * 1000);
  }

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch, notify]}>
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

export const useNotify = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[2]
}

export default NotificationContext
