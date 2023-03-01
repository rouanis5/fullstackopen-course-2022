import React, { useState } from 'react'
import { useField, useRadiosField } from '../hooks'
import diariesService from '../services/diaries'
import { toNewDiaryEntry } from '../utils/parsers'
import { Visibility, Weather } from '../utils/types'
import { useDiariesDispatch } from '../contexts/DiaryContext'

const visibilities = Object.values(Visibility).map((v) => v.toString())
const weathers = Object.values(Weather).map((v) => v.toString())
let timer = 0

const AddDiary = () => {
  const dispatch = useDiariesDispatch()
  const [error, setError] = useState('')

  const date = useField('date')
  const comment = useField('text')
  const WeatherRadios = useRadiosField(weathers)
  const VisibiltyRadios = useRadiosField(visibilities)

  const handler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!dispatch) return
    try {
      const newDiary = toNewDiaryEntry({
        visibility: VisibiltyRadios.value,
        weather: WeatherRadios.value,
        date: date.value,
        comment: comment.value
      })

      const result = await diariesService.add(newDiary)
      dispatch({ type: 'AddDiary', payload: result })
      date.clear()
      comment.clear()
      VisibiltyRadios.clear()
      WeatherRadios.clear()
    } catch (error) {
      let msg = 'something went wrong'
      if (error instanceof Error) {
        msg += ` Error: ${error.message}`
      }
      console.error(msg)
      clearTimeout(timer)
      setError(msg)
      timer = setTimeout(() => {
        setError('')
      }, 2000)
    }
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {error && <p style={{ color: '#f00' }}>{error}</p>}
      <form onSubmit={handler}>
        <label>
          data <input {...date.properties} />
        </label>
        <WeatherRadios.element title="weather" />
        <VisibiltyRadios.element title="visibility" />
        <label>
          comment <input {...comment.properties} />
        </label>
        <br />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}

export default AddDiary
