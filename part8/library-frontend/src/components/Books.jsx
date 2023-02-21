import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../querries/book'

const Books = () => {
  const { data, error, loading } = useQuery(ALL_BOOKS)
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (loading || error) return

    const result = data.allBooks.reduce(
      (init, book) => book.genres.concat(init),
      []
    )
    setBooks(data.allBooks)
    setGenres([...new Set(result)])
  }, [data, loading, error])

  useEffect(() => {
    // genre will never change if allBooks doesn't exit !
    const books = data.allBooks
    setBooks(
      genre ? books?.filter((book) => [...book.genres].includes(genre)) : books
    )
  }, [genre, data])

  return (
    <div>
      <h2>books</h2>
      <div>
        {genres.map((genre, i) => (
          <button
            key={i}
            onClick={() => {
              setGenre(genre)
            }}
          >
            {genre}
          </button>
        ))}
        {genres && <button onClick={() => setGenre(null)}>all genres</button>}
      </div>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
