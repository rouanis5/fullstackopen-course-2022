import { useState } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'

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
      <Filter value={newFilter} onFilter={(e)=>{setNewFilter(e.target.value)}} />

      <h3>Add a new</h3>
      <PersonForm
        name={newName}
        number={newNumber}
        onName={(e)=>{setNewName(e.target.value)}}
        onNumber={(e)=>{setNewNumber(e.target.value)}}
        onSubmit={(e)=>{SubmitNewPerson(e)}}
      />
      
      <h2>Numbers</h2>
      <Persons personsList={persons} filter={newFilter} />
    </div>
  )
}

export default App