const Filter = ({value, onFilter}) => {
  return (
    <div>
        filter shown with: <input value={value} onChange={(e)=>{onFilter(e)}}/>
    </div>
  )
}

export default Filter