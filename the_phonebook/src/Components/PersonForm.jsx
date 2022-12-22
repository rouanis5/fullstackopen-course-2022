import React from 'react'

const PersonForm = ({name, number, onName, onNumber, onSubmit}) => {
  return (
    <form>
      <div>
        name: <input value={name} onChange={(e)=>{onName(e)}}/>
      </div>
      <div>
        number: <input value={number} onChange={(e)=>{onNumber(e)}}/>
      </div>
      <div>
        <button type="submit" onClick={(e)=>onSubmit(e)}>add</button>
      </div>
    </form>
  )
}

export default PersonForm