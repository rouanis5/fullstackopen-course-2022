import { useSelector, useDispatch } from 'react-redux'
import { increaseVote, sortByVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'
import anecdotesService from '../services/anecdotes'

const Anecedote = ({ data: { id, content, votes } }) => {
  const dispatch = useDispatch()
  const vote = async () => {
    await anecdotesService.update(id, { content, votes: votes + 1 })
    dispatch(increaseVote(id))
    dispatch(showNotification(`you voted '${content}'`))
  }

  return (
    <div>
      <div>
        {content}
      </div>
      <div>
        has {votes}
        <button onClick={vote}>vote</button>
      </div>
    </div>
  )
}

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    const filter = state.filter.content
    const anecdotes = sortByVotes(state.anecdotes)

    if (! filter) return anecdotes
    const regex = new RegExp(filter, 'i')
    return anecdotes.filter(({ content }) =>  regex.test(content) )
  })

  return (
    <div>
      {anecdotes.map((anecdote) =>
        <div key={anecdote.id}>
          <Anecedote data={anecdote} />
        </div>
      )}
    </div>
  )
}

export default AnecdoteList