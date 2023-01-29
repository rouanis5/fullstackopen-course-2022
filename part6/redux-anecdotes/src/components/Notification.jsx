// import { useSelector } from 'react-redux'
import { connect } from 'react-redux'

const Notification = (props) => {
  // const notification = useSelector(state => state.notification.message)
  const { notification } = props

  if (!notification) return
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }
  return (
    <div style={style}>
      {notification}
    </div>
  )
}

// export default Notification

const mapStateToProps = state => {
  return {
    notification: state.notification.message
  }
}

export default connect(
  mapStateToProps
)(Notification)
