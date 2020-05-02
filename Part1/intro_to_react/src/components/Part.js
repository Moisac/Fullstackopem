import React from 'react'

export const Part = (props) => {
    return (
        <>
             <p>
                {props.parts[0].name} {props.parts[0].exercises}
            </p>
            <p>
                {props.parts[1].name} {props.parts[1].exercises}
            </p>
            <p>
                {props.parts[2].name} {props.parts[2].exercises}
            </p>
           
        </>
    )
}
