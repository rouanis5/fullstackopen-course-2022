import { createSlice } from '@reduxjs/toolkit'

export const sortByVotes = (array) => {
  return [...array].sort((a, b) => b.votes - a.votes)
}

const initialState = []
// {
//   content: 'anecdote',
//   votes: 0,
//   id: 1,
// }

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote(state, { payload: id }) {
      state.find(item => item.id === id).votes++
    },
    addAnecdote(state, { payload: anecdote }) {
      state.push(anecdote)
    },
    setAnecdotes(state, { payload }) {
      return payload
    }
  }
})

export const { addAnecdote, increaseVote, setAnecdotes } = anecdoteSlice.actions

const anecdoteReducer = anecdoteSlice.reducer
export default anecdoteReducer