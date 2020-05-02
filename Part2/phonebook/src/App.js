import React, { useState, useEffect } from 'react';
import services from './services/persons';
import './App.css'

import { Search } from './components/Search';
import { AddPerson } from './components/AddPerson';
import { Persons } from './components/Persons';
import { Notification } from './components/Notification';

function App() {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [searchName, setSearchName] = useState('');
  const [notification, setNotification] = useState({content: null, type: null});

  useEffect(() => {
    services
      .getPersons()
     .then(response => {
       setPersons(response.data)
       console.log(response.data)
     })
  }, [])

  const handlePhonebookName = (e) => {
    setNewName(e.target.value)
  }

  const handlePhonebookNumber = (e) => {
    setNewNumber(e.target.value)
  }

  const addPhonebook = (e) => {
    e.preventDefault()

    const exist = persons.filter(person => person.name === newName);

    if(exist.length === 0) {
      const phonebookObj = {
        name: newName,
        number: newNumber,
      }

      services
        .addPerson(phonebookObj)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
      setNewName('')
      setNewNumber('')
      setNotification({content: `${phonebookObj.name} has been added to the phonebook`, type: 'success'})
      setTimeout(() => {
        setNotification({content: null})
      }, 3000);
    } else {
      const findPerson = persons.find(person => person.id === exist[0].id);
      const updateNumber = { ...findPerson, number: newNumber };
      if(window.confirm(`Update ${updateNumber.name} phone number?`)) {
        services
        .updateNumber(updateNumber.id, updateNumber)
        .then(response => {
          setPersons(persons.map(person => (person.id !== updateNumber.id ? person : updateNumber)))
          setNewName('')
          setNewNumber('')
          setNotification({content:`${updateNumber.name}  number has been updated`, type: 'success'})
          setTimeout(() => {
            setNotification({content: null})
          }, 3000);
        })
        .catch(error => {
          setNotification({content: `${updateNumber.name} was already deleted`, type: 'error'})
          setTimeout(() => {
            setNotification({content: null})
          }, 3000)
        })
      }
    }
   
  }

  const deletePhonebook = (id) => {
    const personToDelete = persons.find(person => person.id === id)
    if (window.confirm(`Delete ${personToDelete.name}?`)) {
    services
      .deletePerson(id)
      .then((response) => {
        setPersons(persons.filter(person => person.id !== id))
      });
      setNotification({content: `${personToDelete.name}  has been deleted`, type: 'error'})
          setTimeout(() => {
            setNotification({content: null})
          }, 3000);
    }
  }

  const handleSearch = (e) => {
    setSearchName(e.target.value)
  }

  const results = () => {
    if(searchName === '') {
      return persons;
    }
    return [...persons].filter(
      person => person.name.toLowerCase().includes(searchName.toLowerCase())
    )
  }
  
  return (
    <>
    <Notification notification={notification}/>
      <h2>Phonebook</h2>
      <AddPerson 
        newName={newName} 
        handlePhonebookName={handlePhonebookName} 
        newNumber={newNumber} 
        handlePhonebookNumber={handlePhonebookNumber} 
        addPhonebook={addPhonebook}
      />
      <h2>Numbers</h2>
      <Search searchName={searchName} handleSearch={handleSearch} /> 
      <Persons  persons={results()} deletePhonebook={deletePhonebook}/>
    </>
  );
}

export default App;
