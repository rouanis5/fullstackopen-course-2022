import { useQuery, useMutation, useQueryClient } from "react-query"
import anecdotesService from "./services/anecdotes"
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useNotify } from "./contexts/NotificationContex"

const App = () => {
  const queryClient = useQueryClient()
  const voteAnecdoteMutation = useMutation(anecdotesService.update)
  const notify = useNotify()

  const handleVote = (anecdote) => {
    voteAnecdoteMutation.mutate(
      {
        id:anecdote.id,
        newObj: {...anecdote, votes: anecdote.votes + 1}
      },
      {
        onSuccess: (updatedAnec) => {
          const anecdotes = queryClient.getQueryData('anecdotes')
          queryClient.setQueryData('anecdotes', anecdotes.map(anec => anec.id === updatedAnec.id ? updatedAnec : anec))
          notify(`The anecdote is updated successfully`)
        },
        onError: (error) => {
          notify(error.response.data.error)
        }
      }
    )
  }

  const { isLoading, isError, data: anecdotes, error } = useQuery(
    'anecdotes', anecdotesService.getAll,
    {
      retry: 1,
      refetchOnWindowFocus: false,
    }
  )

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
      {isLoading && <p>loading...</p>}
      {isError && <p>anecdote service not available due to problems in server</p>}
      {anecdotes && anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
