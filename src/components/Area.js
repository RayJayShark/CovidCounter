import React from 'react';
import {useParams} from 'react-router-dom';

const Area = () => {
    const { country } = useParams();

    return (
        <h1>{country}</h1>
    )
}

export default Area;