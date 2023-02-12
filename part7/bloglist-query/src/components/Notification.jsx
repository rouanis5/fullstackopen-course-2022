import {
  useNotificationValue,
  NOTIFICATION_TYPES as types
} from '../contexts/notificationContext'
const Notification = () => {
  const { content, type } = useNotificationValue()
  if (!content) return

  const color = type === types.SUCCESS ? 'green' : 'red'
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
