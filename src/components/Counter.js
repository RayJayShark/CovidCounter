import React from 'react';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({country, covid}) => {

    return (
        <div>
            <h3>{country}:</h3>
            <ul>
                <li>Cases: {formatNumber(covid.cases)}</li>
                <li>Deaths: {formatNumber(covid.deaths)}</li>
                <li>Total Population: {formatNumber(covid.population)}</li>
            </ul>
        </div>
    );
}

export default Counter;