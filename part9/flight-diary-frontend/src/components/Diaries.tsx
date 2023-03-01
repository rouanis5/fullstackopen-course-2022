import { DiaryContext } from '../App'
import { useContext } from 'react'

const Diaries = () => {
  const [data] = useContext(DiaryContext)

  if (!data) return null

  return (
    <div>
      <h2>Diary entries</h2>
      {data.map(({ id, date, weather, visibility }) => (
        <div key={id}>
          <h3>{date}</h3>
          <p>visibility: {visibility}</p>
          <p>weather: {weather}</p>
        </div>
      ))}
    </div>
  )
}

export default Diaries
