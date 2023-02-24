import { useEffect, useState } from 'react'
import BooksTable from './BooksTable'
import { useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../querries/book'

const Books = () => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [fetchBooks, { called, data, error, loading }] = useLazyQuery(ALL_BOOKS)

  // const [books, setBooks] = useState([])
  // useEffect(() => {
  //   if (loading || error) return
  //   setBooks(data.allBooks)
  // }, [data, loading, error])

  // useEffect(() => {
  //   const result = data.reduce((init, book) => book.genres.concat(init), [])
  //   setGenres([...new Set(result)])
  // }, [data])

  // useEffect(() => {
  //   setBooks(
  //     genre ? data?.filter((book) => [...book.genres].includes(genre)) : data
  //   )
  // }, [genre, data])

  useEffect(() => {
    fetchBooks({
      variables: { genre },
      onCompleted: (data) => {
        if (genres.length !== 0) return

        const genresArray = data.allBooks.reduce(
          (init, book) => book.genres.concat(init),
          []
        )
        setGenres([...new Set(genresArray)])
      }
    })
  }, [fetchBooks, genre, genres.length])

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
        {called && loading && <p>loading...</p>}
        {called && !loading && !error && <BooksTable books={data?.allBooks} />}
      </div>
    </div>
  )
}

export default Books
