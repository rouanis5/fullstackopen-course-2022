import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    props: {
      type,
      value,
      onChange
    },
    clear
  }
}

export const useResource = (baseUrl) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const api = axios.create({
    baseURL: baseUrl
  })

  useEffect(() => {
    const getAll = async () => {
      try {
        const res = await api.get('/')
        const data = await res.data
        setData(data)
      } catch (e) {
        console.log(e)
        setError('something went wrong')
      }
      setLoading(false)
    }
    getAll()
  }, [])

  const create = (resource) => {
    const run = async () => {
      try {
        setLoading(true)
        const res = await api.post('/', resource)
        const data = await res.data
        setData(prev => prev.concat(data))
      } catch (e) {
        console.error(e)
        setError('creating failed')
      }
      setLoading(false)
    }
    run()
  }

  const resources = {
    data,
    loading,
    error
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}
