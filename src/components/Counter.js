import React from 'react';
import './Counter.css';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const Counter = ({data, extend}) => {


    return (
        <table className="counter">
            { extend ?
                data.map(country =>
                    <tbody>
                        <tr>
                            <th colSpan="2">{country.name}:</th>
                        </tr>
                        <tr>
                            <td>Cases:</td>
                            <td>{formatNumber(country.cases)}</td>
                        </tr>
                        <tr>
                            <td>Deaths:</td>
                            <td>{formatNumber(country.deaths)}</td>
                        </tr>
                        <tr className="bottom">
                            <td>Total Population:</td>
                            <td>{formatNumber(country.population)}</td>
                        </tr>
                    </tbody>)
                :
                <tbody>
                <tr>
                    <th colSpan="2">{data[0].name}:</th>
                </tr>
                <tr>
                    <td>Cases:</td>
                    <td>{formatNumber(data[0].cases)}</td>
                </tr>
                <tr>
                    <td>Deaths:</td>
                    <td>{formatNumber(data[0].deaths)}</td>
                </tr>
                <tr className="bottom">
                    <td>Total Population:</td>
                    <td>{formatNumber(data[0].population)}</td>
                </tr>
                </tbody>
            }
        </table>
    );
}

export default Counter;