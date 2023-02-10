import { useSelector } from 'react-redux'
import { notificationTypes } from '../reducers/notificationReducer'

const Notification = () => {
  const { content, type } = useSelector((state) => state.notification)
  const color = type === notificationTypes.SUCCESS ? 'green' : 'red'

  if (!content) return
  return (
    <div
      style={{
        border: `2px solid ${color}`,
        color,
        backgroundColor: '#dedede',
        padding: '10px 20px',
        fontWeight: 'bold',
        borderRadius: '0.5em'
      }}
      data-test={`notification-${type}`}
    >
      {content}
    </div>
  )
}

export default Notification
