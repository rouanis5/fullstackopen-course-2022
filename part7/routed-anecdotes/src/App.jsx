import { useState } from 'react'
import { Link, Routes, Route, useMatch, useNavigate, Navigate } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import NotFound from './components/NotFound'
import Menu from './components/Menu'
import About from './components/About'
import CreateNew from './components/CreateNew'
import AnecdoteList from './components/AnecdoteList'
import Footer from './components/Footer'

let timer = null
const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, setNotification] = useState('')
  const navigate = useNavigate()

  const notify = (message, timeOnSeconds = 2) => {
    clearInterval(timer)
    setNotification(message)
    timer = setTimeout(() => {
      setNotification('')
    }, timeOnSeconds * 1000)
  }

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    navigate('/')
    notify(`a new anecdote ${anecdote.content} created!`)
  }

  const anecdoteById = (id) =>
  anecdotes.find(a => a.id === id)

  const match = useMatch('/anecdotes/:id')
  const matchedAnec = match
    ? anecdoteById(parseInt(match.params.id))
    : null

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
    notify(`You voted for ${voted.content} by ${voted.author}`)
  }

  return (
    <div>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      <Routes>
        <Route path='/' >
          <Route index element={<AnecdoteList anecdotes={anecdotes} />} />
          <Route path='about' element={<About />} />
          <Route path='create' element={<CreateNew addNew={addNew}/>} />
          <Route path='anecdotes'>
            <Route index element={<Navigate replace to='../' />} />
            <Route
              path=':id'
              element={matchedAnec ? <Anecdote anecdote={matchedAnec} onVote={() => vote(matchedAnec.id)} /> : <NotFound/>}
            />
          </Route>
          <Route path='*' element={<NotFound/>}/>
        </Route>
      </Routes>
      <Footer />
    </div>
  )
}

export default App
