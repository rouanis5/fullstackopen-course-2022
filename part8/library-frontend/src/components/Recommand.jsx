import BooksTable from './BooksTable'
import { useQuery } from '@apollo/client'
import { ME } from '../querries/user'
import { useEffect, useState } from 'react'

export const Recommand = ({ data: fetchedData }) => {
  const { data, loading, error } = useQuery(ME)
  const [books, setBooks] = useState([])

  useEffect(() => {
    if (loading || error) return
    setBooks(
      fetchedData.filter((book) =>
        [...book.genres].includes(data.me.favouriteGenre)
      )
    )
  }, [fetchedData, data, loading, error])

  return (
    <div>
      <h2>Recommandations</h2>
      {loading ? (
        <p>loading...</p>
      ) : error ? (
        <p>something went wrong</p>
      ) : (
        <p>
          books in your favourite genre <b>{data.me?.favouriteGenre}</b>
        </p>
      )}
      <BooksTable books={books} />
    </div>
  )
}
