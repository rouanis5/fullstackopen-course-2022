import axios from 'axios'
const baseUrl = './api/persons'

export const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(res => res.data)
}

export const create = newObject => {
  const req = axios.post(baseUrl, newObject)
  return req.then(res => res.data)
}

export const deleteById = id => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(res => res.data)
}

export const update = (id, newObj)=>{
  const req = axios.put(`${baseUrl}/${id}`,newObj)
  return req.then(res => res.data)
}