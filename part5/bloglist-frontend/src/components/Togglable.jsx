import { useState, useImperativeHandle, forwardRef } from 'react'

// eslint-disable-next-line react/display-name
const Togglable = forwardRef(({ buttonLabel, children }, ref) => {
  const [visibility, setVisibility] = useState(false)

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      {!visibility
        ? (
        <button onClick={toggleVisibility}>{buttonLabel}</button>)
        : (
        <div>
          {children}
          <button onClick={toggleVisibility}>cancel</button>
        </div>)
      }
    </div>
  )
})

export default Togglable
