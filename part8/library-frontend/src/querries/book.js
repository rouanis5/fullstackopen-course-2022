import { gql } from '@apollo/client'

const BOOK_DETAILS = gql`
  fragment BookDetails on Book {
    id
    title
    published
    genres
    author {
      name
    }
  }
`
export const ALL_BOOKS = gql`
  query {
    allBooks {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ALL_BOOKS_BY_GENRE = gql`
  query ($genre: String) {
    allBooks(genre: $genre) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const ADD_BOOK = gql`
  mutation (
    $title: String!
    $published: Int!
    $author: String!
    $genres: [String!]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded {
      ...BookDetails
    }
  }
  ${BOOK_DETAILS}
`

export const updateBooksCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same book twice
  const uniqByName = (a) => {
    const seen = new Set()
    return a.filter((item) => {
      const k = item.id
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook))
    }
  })
}
