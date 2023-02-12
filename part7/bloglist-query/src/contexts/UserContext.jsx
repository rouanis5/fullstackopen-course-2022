import { useReducer, useContext, createContext } from 'react'
import blogService from '../services/blogs'
import constants from '../config/constants'
import loginService from '../services/login'

const initialState = null

const USER_ACTIONS = {
  ADD: 'ADD_USER_DATA',
  CLEAR: 'CLEAR_USER_DATA'
}

const userReducer = (state, { type, payload }) => {
  switch (type) {
    case USER_ACTIONS.ADD:
      return payload
    case USER_ACTIONS.CLEAR:
      return null
    default:
      return state
  }
}

const UserContext = createContext()

export const UserContextProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(userReducer, initialState)
  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserValue = () => {
  const valueAndDispatch = useContext(UserContext)
  return valueAndDispatch[0]
}

export const useUserDispatch = () => {
  const valueAndDispatch = useContext(UserContext)
  return valueAndDispatch[1]
}

export const useLogin = () => {
  const dispatch = useUserDispatch()
  return (userObj = null, { onError, onSuccess } = {}) => {
    const run = async () => {
      try {
        let user = null
        if (userObj) {
          // get user from server
          user = await loginService.login(userObj)
          window.localStorage.setItem(
            constants.userLocalStorage,
            JSON.stringify(user)
          )
        } else {
          // get user from localstorage
          const localStorage = window.localStorage.getItem(
            constants.userLocalStorage
          )
          if (!localStorage) return
          console.log(localStorage)
          user = JSON.parse(localStorage)
        }
        dispatch({ type: USER_ACTIONS.ADD, payload: user })
        blogService.setToken(user.token)
        if (onSuccess) onSuccess(user)
      } catch (error) {
        if (onError) onError(error)
      }
    }
    run()
  }
}

export const useLogout = () => {
  const dispatch = useUserDispatch()
  return () => {
    dispatch({ type: USER_ACTIONS.CLEAR })
    window.localStorage.removeItem(constants.userLocalStorage)
    blogService.setToken(null)
  }
}

export default UserContext
