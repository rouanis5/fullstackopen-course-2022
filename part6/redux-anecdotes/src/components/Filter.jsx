import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'

const Filter = (props) => {
  // const filter = useSelector(state => state.filter.content)
  // const dispatch = useDispatch()
  const { filter } = props
  const handleChange = (e) => {
    // dispatch(setFilter(e.target.value))
    props.setFilter(e.target.value)
  }

  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} value={filter} />
    </div>
  )
}

// export default Filter

const mapStateToProps = state => {
  return {
    filter: state.filter.content
  }
}

const mapDispatchToProps = {
  setFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
