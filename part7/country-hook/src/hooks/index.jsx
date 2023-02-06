import { useState, useEffect } from 'react'
import axios from 'axios'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

export const useCountry = (name) => {
  const [country, setCountry] = useState(null)

  useEffect(() => {
    if (name && name.trim()) {
      axios.get(`https://restcountries.com/v3.1/name/${name}`)
        .then(res => res.data)
        .then(data => setCountry({data: data[0], found: data ? true : false}))
          .catch(e => setCountry(null))
    }
  }, [name])

  return country
}
