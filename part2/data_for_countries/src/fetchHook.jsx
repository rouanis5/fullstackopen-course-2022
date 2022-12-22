import { useState, useEffect } from "react"
import axios from "axios"

const UseFetch = (API_URL) => {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(()=>{
    axios.get(API_URL)
    .then((res)=> {
      setLoading(false)
      setData(res.data)
    })
    .catch((err)=>{
      setLoading(false)
      setError(err.message || 'something went wrong !')
    })
  },[])

  return {loading, data, error};
}

export default UseFetch