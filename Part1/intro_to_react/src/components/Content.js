import React from 'react';
import {Part} from '../components/Part';

export const Content = (props) => {
    return (
        <>
           <Part parts={props.parts}/>
        </>
    )
}
