import React from 'react'

export const Part = ({title, parts }) => {
    const total = parts.reduce((acc, curr) => {
        return acc + curr.exercises;
    }, 0) 
    console.log(total)
    return (
        <>
            <h3>{ title }</h3>
            {parts.map((part) => (
                <div>
                    <p key={part.id}>{part.name}: {part.exercises}</p>
                </div>
            ))}
            <p><b>Total:</b> {total}</p>
        </>
    )
}
