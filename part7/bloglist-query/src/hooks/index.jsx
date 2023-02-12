import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAlert } from '../contexts/notificationContext'

export const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return [
    value,
    {
      props: {
        type,
        value,
        onChange
      },
      clear
    }
  ]
}

export const useCustomMutation = (mutationFn, onSuccess) => {
  const queryClient = useQueryClient()
  const alert = useAlert()
  return useMutation({
    mutationFn,
    onSuccess: (...args) => onSuccess(queryClient, ...args),
    onError: (exception) => {
      const msg = exception.response.data.error || 'something went wrong !'
      alert(msg)
      console.error(msg)
    }
  })
}
