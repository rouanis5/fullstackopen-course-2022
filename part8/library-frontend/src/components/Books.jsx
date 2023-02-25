import { useEffect, useState } from 'react'
import BooksTable from './BooksTable'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ALL_BOOKS_BY_GENRE } from '../querries/book'

const Books = () => {
  const [genres, setGenres] = useState([])
  const [genre, setGenre] = useState(null)
  const [books, setBooks] = useState([])
  const result = useQuery(ALL_BOOKS)
  const [fetchBooks, { called, loading }] = useLazyQuery(ALL_BOOKS_BY_GENRE)

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

  const setBooksByGenre = (selectedGenre = null) => {
    if (result.error || result.loading) return
    if (!selectedGenre) {
      setBooks(result.data.allBooks)
      setGenre(selectedGenre)
      return
    }
    if (genres.length === 0) return
    fetchBooks({
      variables: { genre: selectedGenre },
      onCompleted: (data) => {
        setBooks(data.allBooks)
        setGenre(selectedGenre)
      }
    })
  }

  useEffect(() => {
    if (result.error || result.loading) return
    const books = result.data.allBooks
    setBooksByGenre()

    const genresArray = books.reduce(
      (init, book) => book.genres.concat(init),
      []
    )
    setGenres([...new Set(genresArray)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result])

  return (
    <div>
      <h2>books {genre && `(${genre})`}</h2>
      <div>
        {genres.map((type, i) => (
          <button
            key={i}
            disabled={type === genre}
            onClick={() => {
              setBooksByGenre(type)
            }}
          >
            {type}
          </button>
        ))}
        {genres && (
          <button disabled={!genre} onClick={() => setBooksByGenre()}>
            all genres
          </button>
        )}
        {((called && loading) || result.loading) && <p>loading...</p>}
        <BooksTable books={books} />
      </div>
    </div>
  )
}

export default Books
