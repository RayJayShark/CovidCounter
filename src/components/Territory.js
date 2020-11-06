import React from 'react';
import {useParams} from 'react-router-dom';

const Territory = ({europeData, americaData}) => {
    const { territory } = useParams();
    let exists = true;
    const territoryData =
        americaData.filter(item => item.name.toLowerCase() === territory.toLowerCase())
        ??
        europeData.filter(item => item.name.toLowerCase() === territory.toLowerCase());

    if (territoryData.length === 0)
        exists = false;

    return (
        <div style={{color: '#FFFFFF'}}>
            <h1>{territory}</h1>
            <h3>Cases: {exists ? territoryData.reduce(((acc, cur) => acc + cur.cases), 0) : "Loading..."}</h3>
        </div>
    )
}

export default Territory;