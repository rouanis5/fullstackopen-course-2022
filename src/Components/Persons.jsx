import React from 'react'

const Persons = ({personsList, filter, onDelete}) => {
  // The filtering logic shown in the image is case insensitive
  const filteredPersons = personsList.filter(el=> el.name.toLowerCase().match(filter.toLowerCase()))

  return (
    <div>
      {(filteredPersons.length === 0) && <p>empty list !</p>}
      {filteredPersons.map(({name, number, id}) =>
        <li key={id}>
          {name} {number}
          <button onClick={()=>{onDelete(id)}}>delete</button>
        </li>
      )}
    </div>
  )
}

export default Persons