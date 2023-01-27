import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  content: ''
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter: (state, { payload }) => {
      state.content = payload
    },
    removeFilter: (state) => {
      state.content = ''
    }
  }
})

const filterReducer = filterSlice.reducer
export default filterReducer

export const { setFilter, removeFilter } = filterSlice.actions
