import { useSelector, useDispatch } from 'react-redux'
import { increaseVote, sortByVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector(state => sortByVotes(state.anecdotes))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVote(id))
  }
  return (
    <div>
      {anecdotes.map(({ id, content, votes }) =>
        <div key={id}>
          <div>
            {content}
          </div>
          <div>
            has {votes}
            <button onClick={() => vote(id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList