import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks {
      id
      title
      published
      genres
      author {
        name
      }
    }
  }
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
      id
      title
      published
      author {
        name
      }
      genres
    }
  }
`
