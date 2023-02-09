const Notification = ({ msg, type }) => {
  const color = type === 'success' ? 'green' : 'red'
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
      {msg}
    </div>
  )
}

export default Notification
