import axios from 'axios'
import {
  NonSensitiveDiaryEntry,
  NewDiaryEntry,
  DiaryEntry
} from '../utils/types'

const api = axios.create({
  baseURL: 'http://localhost:3000/api/diaries'
})

const getAll = async () => {
  const result = await api.get<NonSensitiveDiaryEntry[]>('/')
  return result.data
}

const getById = async ({ id }: { id: string }) => {
  const result = await api.get<DiaryEntry>(`/${id}`)
  return result.data
}

const add = async (object: NewDiaryEntry) => {
  const result = await api.post<NonSensitiveDiaryEntry>('/', object)
  return result.data
}

const diariesService = { getAll, getById, add }
export default diariesService
