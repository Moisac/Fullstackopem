import React from 'react';
import {Part} from '../components/Part';

export const Course = ({ course }) => {
    return (
        <>
        { course.map((title) => 
            <Part key={title.id} title={title.name} parts={title.parts}/>
        )}
           
        </>
    )
}
