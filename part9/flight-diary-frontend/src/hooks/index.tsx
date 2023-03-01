import React, { useState } from 'react'
import RadioInputs from '../components/RadioInputs'

export const useField = (type: React.HTMLInputTypeAttribute) => {
  const [value, setValue] = useState('')

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value)
  }

  const clear = () => {
    setValue('')
  }

  return {
    properties: {
      type,
      value,
      onChange
    },
    clear,
    value
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useRadiosField = (list: any[]) => {
  const [value, setValue] = useState('')
  const clear = () => setValue('')
  const Component = ({ title }: { title: string }) => {
    return (
      <RadioInputs
        list={list}
        title={title}
        onChange={(e) => setValue(e.target.value)}
        state={value}
      />
    )
  }

  return {
    element: Component,
    value,
    clear
  }
}
