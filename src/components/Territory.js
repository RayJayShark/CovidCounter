import React from 'react';
import {useParams} from 'react-router-dom';
import {US} from '../assets/countries.json'

const Territory = ({europeData, americaData}) => {
    const { territory } = useParams();
    let exists = true;
    const countryData =
        americaData.find(item => US[item.state].toLowerCase() === territory.toLowerCase())
        ??
        europeData.filter(item => item.countriesAndTerritories.toLowerCase() === territory.toLowerCase());

    if (!countryData || countryData.length === 0)
        exists = false;

    return (
        <div style={{color: '#FFFFFF'}}>
            <h1>{territory}</h1>
            <h3>Cases: {exists ? countryData.tot_cases || countryData.reduce(((acc, cur) => acc + cur.cases), 0) : "Loading..."}</h3>
        </div>
    )
}

export default Territory;