import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

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

const { addAnecdote, increaseVote, setAnecdotes } = anecdoteSlice.actions

const anecdoteReducer = anecdoteSlice.reducer
export default anecdoteReducer

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdotesService.createNew(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdoteData => {
  return async dispatch => {
    const { id, votes } = anecdoteData
    await anecdotesService.update(id, { ...anecdoteData, votes: votes + 1 })
    dispatch(increaseVote(id))
  }
}
