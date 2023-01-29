// import { useDispatch } from 'react-redux'
import { connect } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = (props) => {
  // const dispatch = useDispatch()
  const add = (e) => {
    e.preventDefault()
    const content = e.target['anecdote'].value
    if(content && content.trim()) {
      e.target.anecdote.value = ''
      // dispatch(createAnecdote(content))
      props.createAnecdote(content)
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

// export default AnecdoteForm

const mapDispatchToProps = {
  createAnecdote
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)
