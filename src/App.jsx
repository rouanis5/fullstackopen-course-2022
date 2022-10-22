import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')
  // filtering person by name
  const filteredPersons = persons.filter(el=> el.name.toLowerCase().match(newFilter.toLowerCase()))

  function SubmitNewPerson(event){
    //prevent default action
    event.preventDefault()

    // prevent submitting empty name and number
    if(!newName){
      alert('empty name !')
      return;
    }
    if(!newNumber){
      alert('empty number !')
      return;
    }
    
    // prevent submitting an existed name
    const doesExist = persons.find(el=> el.name === newName)
    if (doesExist) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      return;
    }

    const newId = persons[persons.length - 1].id + 1
    setPersons((prevPersons)=>
       [...prevPersons, {name: newName, number: newNumber, id: newId}]
    )
    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }




  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with: <input value={newFilter} onChange={(e)=>{setNewFilter(e.target.value)}}/>
      </div>
      <form>
        <div>
          name: <input value={newName} onChange={(e)=>{setNewName(e.target.value)}}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={(e)=>{setNewNumber(e.target.value)}}/>
        </div>
        <div>
          <button type="submit" onClick={(e)=>{SubmitNewPerson(e)}}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {(filteredPersons.length === 0) && <p>empty list !</p>}
      {filteredPersons.map(({name, number, id})=> <li key={id}>{name} {number}</li>)}
    </div>
  )
}

export default App