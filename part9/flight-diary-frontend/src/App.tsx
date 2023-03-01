import React, { useState, useEffect, createContext } from 'react'
import { NonSensitiveDiaryEntry } from './utils/types'
import Diaries from './components/Diaries'
import AddDiary from './components/AddDiary'
import diariesService from './services/diaries'

export const DiaryContext = createContext<
  | [
      NonSensitiveDiaryEntry[],
      React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>
    ]
  | []
>([])

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    diariesService.getAll().then((data) => setDiaries(data))
  }, [])
  return (
    <div>
      <DiaryContext.Provider value={[diaries, setDiaries]}>
        <AddDiary />
        <Diaries />
      </DiaryContext.Provider>
    </div>
  )
}

export default App
