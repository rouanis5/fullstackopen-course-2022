import { useState, useEffect } from 'react'
import Filter from './Components/Filter'
import PersonForm from './Components/PersonForm'
import Persons from './Components/Persons'
import { getAll, create, deleteById, update } from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const [newFilter, setNewFilter] = useState('')

  useEffect(()=>{
    getAll()
    .then(data => {
      setPersons(data)
    })
    .catch(err => {
      alert('something went wrong');
    })
  },[])


  function resetFields(){
    setNewFilter('')
    setNewName('')
    setNewNumber('')
  }
  function submitNewPerson(event){
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
    const existedPerson = persons.find(el=> el.name === newName)
    if (existedPerson) {
      const confirmation = confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (!confirmation) {
        resetFields()
        return;
      }

      update(existedPerson.id, {
        ...existedPerson,
        number: newNumber
      })
      .then(returnedObj => {
        const res = persons.map(person => person.id === returnedObj.id ? returnedObj : person)
        setPersons(res)
      })
      .catch(err => {
        alert('something went wrong');
      })

      resetFields()
      return

    }

    const newId = persons[persons.length - 1].id + 1
    const newObj = {
      name: newName,
      number: newNumber,
      id: newId
    }

    create(newObj)
    .then(returnedObj => {
      setPersons([...persons, returnedObj])
      resetFields()
    })
    .catch(err => {
      alert('something went wrong');
    })
  }

  function deletePerson({id, name}){
    const confirmation = confirm(`Delete ${name} ?`)
    if (!confirmation) return

    deleteById(id)
    .then(returnedObj =>{
      const res = persons.filter(el => el.id !== id)
      setPersons(res)
    })
    .catch(err => {
      alert('something went wrong');
    })
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
        onSubmit={(e)=>{submitNewPerson(e)}}
      />
      
      <h2>Numbers</h2>
      <Persons personsList={persons} filter={newFilter} onDelete={deletePerson} />
    </div>
  )
}

export default App