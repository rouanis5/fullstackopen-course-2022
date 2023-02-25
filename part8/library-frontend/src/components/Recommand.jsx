import { useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS_BY_GENRE } from '../querries/book'
import { ME } from '../querries/user'
import BooksTable from './BooksTable'

export const Recommand = () => {
  const result = useQuery(ME)
  const [fetchBooks, { called, data, loading, error }] =
    useLazyQuery(ALL_BOOKS_BY_GENRE)

  useEffect(() => {
    if (result.loading || result.error) return
    const { favouriteGenre } = result.data.me
    fetchBooks({
      variables: { genre: favouriteGenre }
    })
  }, [fetchBooks, result])

  return (
    <div>
      <h2>Recommandations</h2>
      {result.loading ? (
        <p>loading...</p>
      ) : result.error ? (
        <p>something went wrong</p>
      ) : (
        <>
          <p>
            books in your favourite genre <b>{result.data.me.favouriteGenre}</b>
          </p>
          {called && loading && <p>loading...</p>}
          {called && !loading && !error && <BooksTable books={data.allBooks} />}
        </>
      )}
    </div>
  )
}
