import { useState, useEffect } from 'react'
import axios from 'axios'
import personsService from './services/persons'

const Notification =  ({ message, error }) => {
  if(message === null) {
    return null
  }

  if(error === true) {
    return (
      <div className="error">
        {message}
      </div>
    )
  } else {
    return (
      <div className="notification">
        {message}
      </div>
    )  
  }
}

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

const ListNames = ({persons, newFilter, deleteContact}) => {
  const namesToShow = newFilter ? persons.filter(person => person.name.includes(newFilter)) : persons
  return (
    <div>
      <table><tbody>
        <tr><td><b>Name</b></td><td><b>Number</b></td></tr>
        {namesToShow.map(person => (
          <tr key={person.name}><td>{person.name}</td><td>{person.number}</td><td><button onClick={() => deleteContact(persons, person.id, namesToShow)}>Delete</button></td></tr>
        ))}  
      </tbody></table>
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [notificationType, setNotificationType] = useState(false)

  useEffect(() => {
    personsService
      .getAll()
        .then(initialPersons => {
          setPersons(initialPersons)
        })   
  }, [])

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
      //setPersons(persons.concat(nameObject))
      personsService
        .create(nameObject)
          .then(returnedPerson => {
            setPersons(persons.concat(returnedPerson))
            setNewName('')
            setNewNumber('')
            setErrorMessage(`Added ${returnedPerson.name}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
    } else {
      //alert(`Name ${newName} already exists in the phonebook`)
      if (window.confirm(`Name ${nameObject.name} is already in phonebook. Do you want to replace old number with new one?`)) {
        const personToBeUpdated = persons.find(person => person.name === nameObject.name) 
        const updatedEntry = {...personToBeUpdated, number: newNumber}
        personsService
          .update(personToBeUpdated.id, updatedEntry)
            .then(updatedPerson => {
              setPersons(persons.map(person => person.id !== personToBeUpdated.id ? person : updatedPerson))
              setNewName('')
              setNewNumber('')
              setErrorMessage(`Modified ${personToBeUpdated.name}`)
              setTimeout(() => {
                setErrorMessage(null)
              }, 5000)
            })
          .catch(error => {
            setNotificationType(true)
            setErrorMessage(`Person ${nameObject.name} was already removed from the server`)
            setTimeout(() => {
              setErrorMessage(null)
              setNotificationType(false)
            }, 5000)
          })
      }
    }
  }

  const deleteContact = (persons, id) => {
    //console.log('delete contact')
    const personToBeRemoved = persons.find(person => person.id === id) 
    if (window.confirm(`Are you sure you want to remove ${personToBeRemoved.name} from phonebook?`)) {
      personsService
        .remove(id)
          .then(removedId => {
            setPersons(persons.filter(person => person.id !== id))
            setErrorMessage(`Removed ${personToBeRemoved.name} from phonebook`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setNotificationType(true)
            setErrorMessage(`Person ${personToBeRemoved.name} you tried to remove did not exist`)
            setTimeout(() => {
              setErrorMessage(null)
              setNotificationType(false)
            }, 5000)
          })
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
      <Notification message={errorMessage} error={notificationType} />
      <FilterForm newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <h2>Add new phonebook entry</h2>
      <InputForm addName={addName} newName={newName} newNumber={newNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
      <ListNames persons={persons} newFilter={newFilter} deleteContact={deleteContact}/>
    </div>
  )

}

export default App
