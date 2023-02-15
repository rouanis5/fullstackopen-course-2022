import { createSlice } from '@reduxjs/toolkit'
import constants from '../config/constants'
const localStorageKey = constants.themeLocalStorage

const attribute = 'data-mode'
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
      const isDark =
        localStorage.getItem(localStorageKey) === themes.dark ||
        (!(localStorageKey in localStorage) &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)

      document.documentElement.setAttribute(
        attribute,
        isDark ? themes.dark : themes.light
      )
      return isDark
    },
    toggleTheme: (state) => {
      const theme = state ? themes.light : themes.dark
      document.documentElement.setAttribute(attribute, theme)
      window.localStorage.setItem(localStorageKey, theme)
      return !state
    }
  }
})

export default darkthemeSlice.reducer
export const { getThemeFromLocalStorage, toggleTheme } = darkthemeSlice.actions
