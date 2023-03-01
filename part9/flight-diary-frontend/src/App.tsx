import { useEffect } from 'react'
import Diaries from './components/Diaries'
import AddDiary from './components/AddDiary'
import { useDiariesDispatch } from './contexts/DiaryContext'
import diariesService from './services/diaries'

const App = () => {
  const dispatch = useDiariesDispatch()

  useEffect(() => {
    diariesService
      .getAll()
      .then(
        (payload) => dispatch && dispatch({ type: 'fetchDiaries', payload })
      )
  }, [])

  return (
    <div>
      <AddDiary />
      <Diaries />
    </div>
  )
}

export default App
