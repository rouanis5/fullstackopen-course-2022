import { useSelector, useDispatch } from 'react-redux'
import { increaseVote, sortByVotes } from '../reducers/anecdoteReducer'
import { showNotification } from '../reducers/notificationReducer'

const Anecedote = ({ data: { id, content, votes } }) => {
  const dispatch = useDispatch()
  const vote = () => {
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
  const anecdotes = useSelector(state => sortByVotes(state.anecdotes))

  return (
    <div>
      {anecdotes.map((anecdote) =>
        <Anecedote key={anecdote.id} data={anecdote} />
      )}
    </div>
  )
}

export default AnecdoteList