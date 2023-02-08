import { useField, useResource } from './hooks'

const App = () => {
  const content = useField('text')
  const name = useField('text')
  const number = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.props.value })
    content.clear()
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.props.value, number: number.props.value})
    name.clear()
    number.clear()
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content.props} />
        <button>create</button>
      </form>
      {notes.error && <p>{notes.error}</p>}
      {!notes.error && notes.data.map(n => <p key={n.id}>{n.content}</p>)}
      {notes.loading && <p>loading notes...</p>}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name.props} /> <br/>
        number <input {...number.props} />
        <button>create</button>
      </form>
      { persons.error 
        ? <p>{persons.error}</p> 
        : persons.data.map(n => <p key={n.id}>{n.name} {n.number}</p>)
      }
      {persons.loading && <p>loading persons...</p>}
    </div>
  )
}

export default App