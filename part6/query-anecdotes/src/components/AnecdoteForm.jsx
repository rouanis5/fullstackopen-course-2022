import { useMutation, useQueryClient } from "react-query"
import anecdotesService from "../services/anecdotes"
import { useNotify } from "../contexts/NotificationContex"

const AnecdoteForm = () => {
  const queryClient = useQueryClient()
  const newAnecdoteMutation = useMutation(anecdotesService.createNew)
  const notify = useNotify()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    if (!content && !content.trim()) return
    newAnecdoteMutation.mutate(content, {
      onSuccess: (newAnecdote) => {
        const anecdotes = queryClient.getQueryData('anecdotes')
        queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
        notify(`The anecdote is added successfully`)
      },
      onError: (error) => {
        notify(error.response.data.error)
      }
    })
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
