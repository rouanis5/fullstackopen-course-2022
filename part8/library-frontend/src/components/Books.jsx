import { useEffect, useState } from 'react'
import BooksTable from './BooksTable'

const Books = ({ data }) => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])

  useEffect(() => {
    const result = data.reduce((init, book) => book.genres.concat(init), [])
    setGenres([...new Set(result)])
  }, [data])

  useEffect(() => {
    setBooks(
      genre ? data?.filter((book) => [...book.genres].includes(genre)) : data
    )
  }, [genre, data])

  return (
    <div>
      <h2>books {genre && `(${genre})`}</h2>
      <div>
        {genres.map((type, i) => (
          <button
            key={i}
            disabled={type === genre}
            onClick={() => {
              setGenre(type)
            }}
          >
            {type}
          </button>
        ))}
        {genres && (
          <button disabled={!genre} onClick={() => setGenre(null)}>
            all genres
          </button>
        )}
        <BooksTable books={books} />
      </div>
    </div>
  )
}

export default Books
