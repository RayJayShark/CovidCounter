import React from 'react';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({region, data}) => {


    return (
        <table style={{border: "1px solid"}}>
            <thead>
                <tr>
                    <th colSpan="2" >{region}:</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>Cases:</td>
                    <td>{formatNumber(data[0].cases)}</td>
                </tr>
                <tr>
                    <td>Deaths:</td>
                    <td>{formatNumber(data[0].deaths)}</td>
                </tr>
                <tr>
                    <td>Total Population:</td>
                    <td>{formatNumber(data[0].population)}</td>
                </tr>
            </tbody>
        </table>
    );
}

export default Counter;