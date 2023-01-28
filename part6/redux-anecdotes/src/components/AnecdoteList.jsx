import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote, sortByVotes } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'

const Anecedote = ({ data }) => {
  const { content, votes } = data
  const dispatch = useDispatch()
  const vote = () => {
    dispatch(voteAnecdote(data))
    dispatch(notify(`you voted '${content}'`, 3))
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