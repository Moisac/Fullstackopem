import React from 'react'

export const Persons = ({ persons, deletePhonebook }) => {
    return (
        <>
        {
            persons.map((person) => (
              <div key={person.id}>
                <p>{person.name}: {person.number}</p><button onClick={() => deletePhonebook(person.id)}>Delete</button>
              </div>
            ))
          }
          </>
    )
}
