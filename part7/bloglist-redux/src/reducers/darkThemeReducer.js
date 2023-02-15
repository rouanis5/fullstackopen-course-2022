import { createSlice } from '@reduxjs/toolkit'
import constants from '../config/constants'
const localStorageKey = constants.themeLocalStorage

const themes = {
  dark: 'dark',
  light: ''
}

const initialState = false

const darkthemeSlice = createSlice({
  name: 'darkTheme',
  initialState,
  reducers: {
    getThemeFromLocalStorage: () => {
      if (
        localStorage.getItem(localStorageKey) === themes.dark ||
        (!(localStorageKey in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
      ) {
        document.documentElement.classList.add(themes.dark)
        return true
      } else {
        document.documentElement.classList.remove(themes.dark)
        return false
      }
    },
    toggleTheme: (state) => {
      document.documentElement.classList.toggle(themes.dark)
      const theme = state ? themes.light : themes.dark
      window.localStorage.setItem(localStorageKey, theme)
      return !state
    }
  }
})

export default darkthemeSlice.reducer
export const { getThemeFromLocalStorage, toggleTheme } = darkthemeSlice.actions
