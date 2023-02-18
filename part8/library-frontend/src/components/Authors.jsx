import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../querries/author'
import SetBirthYear from './SetBirthYear'

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
      {!loading && !error && <SetBirthYear authorsNames={data.allAuthors} />}
    </div>
  )
}

export default Authors
