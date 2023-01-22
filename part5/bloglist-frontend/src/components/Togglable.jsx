import { useState, useImperativeHandle, forwardRef } from 'react'
import PropTypes from 'prop-types'
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
Togglable.displayName = 'Togglable'
Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired,
  children: PropTypes.arrayOf(PropTypes.element).isRequired
}
export default Togglable
