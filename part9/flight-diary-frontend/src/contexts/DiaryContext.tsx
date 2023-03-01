import React, { useReducer, createContext, useContext } from 'react'
import { NonSensitiveDiaryEntry, DiaryEntry } from '../utils/types'

interface ContextProps {
  children: React.ReactElement
}

type StateType = NonSensitiveDiaryEntry[]

type ActionType =
  | { type: 'fetchDiaries'; payload: NonSensitiveDiaryEntry[] }
  | { type: 'AddDiary'; payload: DiaryEntry }

export const DiaryContext = createContext<
  [StateType, React.Dispatch<ActionType>] | [null, null]
>([null, null])

const reducer = (state: StateType, action: ActionType): StateType => {
  const { type, payload } = action
  switch (type) {
    case 'fetchDiaries':
      return payload
    case 'AddDiary':
      return [...state, payload]
    default:
      return state
  }
}

export const DiaryContextProvider = (props: ContextProps) => {
  const [diaries, dipatchDiaries] = useReducer(reducer, [])
  return (
    <DiaryContext.Provider value={[diaries, dipatchDiaries]}>
      {props.children}
    </DiaryContext.Provider>
  )
}

export const useDiaries = () => {
  const [diaries] = useContext(DiaryContext)
  return diaries
}

export const useDiariesDispatch = () => {
  const [, disptch] = useContext(DiaryContext)
  return disptch
}
