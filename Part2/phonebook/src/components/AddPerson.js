import React from 'react'

export const AddPerson = ({ newName, newNumber, handlePhonebookName, handlePhonebookNumber, addPhonebook }) => {
    return (
        <div>
            <form onSubmit={addPhonebook}>
            <div>
            Name: <input value={newName} onChange={handlePhonebookName}/>
            </div>
            <div>
            Number: <input value={newNumber} onChange={handlePhonebookNumber}/>
            </div>
            <div>
            <button type="submit">Add</button>
            </div>
        </form>
        </div>
    )
}
