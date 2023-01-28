import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdotesService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = async (e) => {
    e.preventDefault()
    const content = e.target['anecdote'].value
    if(content && content.trim()) {
      e.target.anecdote.value = ''
      const newAnecdote = await anecdotesService.createNew(content)
      dispatch(addAnecdote(newAnecdote))
    }
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={add}>
        <input type="text" name='anecdote' />
        <button type="submit">add</button>
      </form>
    </div>
  )
}

export default AnecdoteForm