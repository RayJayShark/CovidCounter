import React from 'react';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({country, covid}) => {

    return (
        <table style={{border: "1px solid"}}>
            <thead>
                <tr>
                    <th colSpan="2" >{country}:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cases:</td>
                    <td>{formatNumber(covid.cases)}</td>
                </tr>
                <tr>
                    <td>Deaths:</td>
                    <td>{formatNumber(covid.deaths)}</td>
                </tr>
                <tr>
                    <td>Total Population:</td>
                    <td>{formatNumber(covid.population)}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Counter;