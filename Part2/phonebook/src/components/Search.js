import React from 'react'

export const Search = ({ searchName, handleSearch }) => {
    return (
        <div>
            Search by name: <input value={searchName} onChange={handleSearch} />
        </div>
    )
}
