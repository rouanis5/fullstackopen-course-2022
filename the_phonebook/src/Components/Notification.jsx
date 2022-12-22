const styles = {
  common: {
    background: '#ddd',
    padding: '10px',
    fontWeight: 'bold',
    marginBlock: '10px',
    borderRadius: '0.77rem',
    border: '1px solid',

  },
  success: {
    color: 'green',
    borderColor: 'green'
  },
  error: {
    color: 'red',
    borderColor: 'red'
  }
}

const Notification = ({message, type = 'success'}) => {
  const notifStyle = {...styles.common, ...styles[type]}
  
  return (
    <div style={notifStyle}>
      {message}
    </div>
  )
}

export default Notification