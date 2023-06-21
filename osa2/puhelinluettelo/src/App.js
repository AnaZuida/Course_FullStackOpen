import { useState } from 'react'

const FilterForm = ({newFilter, handleFilterChange}) => {
  // Component for filtering phonebook
  return (
    <form>
      <div>
        Filter shown with <input value={newFilter} onChange={handleFilterChange} />  
      </div>
    </form>
  )
}

const InputForm = ({addName, newName, newNumber ,handleNameChange, handleNumberChange}) => {
  return (
    <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange} /><br />
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
  )
}

const ListNames = ({persons, namesToShow}) => {
  return (
    <div>
      <table><tbody>
        <tr><td><b>Name</b></td><td><b>Number</b></td></tr>
        {namesToShow.map(person => (
          <tr key={person.name}><td>{person.name}</td><td>{person.number}</td></tr>
        ))}  
      </tbody></table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  
  const namesToShow = newFilter ? persons : persons.filter(person => person.name.includes(newFilter))
  
  const addName = (event) => {
    event.preventDefault()
    //console.log('button clicked', event.target)
    //console.log(persons)
    //console.log(newName)
    const nameObject = {
      name: newName,
      number: newNumber
    }
    //console.log(nameObject)
    if (!persons.some(person => person.name === nameObject.name)) {
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    } else {
      alert(`Name ${newName} already exists in the phonebook`)
    }
  }

  const handleNameChange = (event) => {
    //console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new phonebook entry</h2>
      <InputForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ListNames persons={persons} namesToShow={namesToShow}/>
    </div>
  )

}

export default App
