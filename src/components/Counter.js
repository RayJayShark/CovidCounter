import React from 'react';
import './Counter.css';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({data, extend}) => {


    return (
        <table className="counter">
            { extend ?
                <tbody>
                    <tr>
                        <td>Area:</td>
                        <td>Cases:</td>
                        <td>Deaths:</td>
                        <td>Total Population:</td>
                    </tr>
                    {data.map(country =>
                        <tr key={country.name}>
                            <th>{country.name}:</th>
                            <td>{formatNumber(country.cases)}</td>
                            <td>{formatNumber(country.deaths)}</td>
                            <td>{formatNumber(country.population)}</td>
                        </tr>
                    )}
                </tbody>
                :
                <tbody>
                    <tr>
                        <td>Area:</td>
                        <td>Cases:</td>
                        <td>Deaths:</td>
                        <td>Total Population:</td>
                    </tr>
                    <tr>
                        <th>{data[0].name}:</th>
                        <td>{formatNumber(data[0].cases)}</td>
                        <td>{formatNumber(data[0].deaths)}</td>
                        <td>{formatNumber(data[0].population)}</td>
                    </tr>
                </tbody>
            }
        </table>
    );
}

export default Counter;