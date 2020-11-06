import React from 'react';
import {useParams} from 'react-router-dom';

const Territory = ({covidData}) => {
    const { territory } = useParams();
    let exists = false;
    const territoryData = covidData.filter(item => item.name.toLowerCase() === territory.toLowerCase())

    if (territoryData.length > 0)
        exists = true;

    return (
        <div style={{color: '#FFFFFF'}}>
            <h1>{territory}</h1>
            <strong>Cases:</strong> {exists ? territoryData.reduce(((acc, cur) => acc + cur.cases), 0) : "Loading..."}<br/>
            <strong>Deaths:</strong> {exists ? territoryData.reduce(((acc, cur) => acc + cur.deaths), 0) : "Loading..."}<br/>
            <strong>Population:</strong> {exists ? territoryData[0].population : "Loading..."}
        </div>
    )
}

export default Territory;