import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      id
      bookCount
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation ($name: String!, $year: Int!) {
    editAuthor(name: $name, setBornTo: $year) {
      born
      id
    }
  }
`
