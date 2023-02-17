import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../querries/author'

const Authors = () => {
  const { data, loading, error } = useQuery(ALL_AUTHORS)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {!loading &&
            !error &&
            data.allAuthors.map((a) => (
              <tr key={a.id}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
