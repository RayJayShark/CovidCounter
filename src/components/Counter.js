import React from 'react';
import './Counter.css';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatPercent = (number) => {
    return (Number.parseFloat(number) * 100).toFixed(2).toString() + "%";
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
                        <td>Ratio (Cases/Population):</td>
                        <td>Ratio (Deaths/Population):</td>
                        <td>Ratio (Deaths/Cases):</td>
                    </tr>
                    {data.map(country =>
                        <tr key={country.name}>
                            <th>{country.name}:</th>
                            <td>{formatNumber(country.cases)}</td>
                            <td>{formatNumber(country.deaths)}</td>
                            <td>{formatNumber(country.population)}</td>
                            <td>{formatPercent(country.cases / country.population)}</td>
                            <td>{formatPercent(country.deaths / country.population)}</td>
                            <td>{formatPercent(country.deaths / country.cases)}</td>
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
                        <td>Ratio (Cases/Population):</td>
                        <td>Ratio (Deaths/Population):</td>
                        <td>Ratio (Deaths/Cases):</td>
                    </tr>
                    <tr>
                        <th>{data[0].name}:</th>
                        <td>{formatNumber(data[0].cases)}</td>
                        <td>{formatNumber(data[0].deaths)}</td>
                        <td>{formatNumber(data[0].population)}</td>
                        <td>{formatPercent(data[0].cases / data[0].population)}</td>
                        <td>{formatPercent(data[0].deaths / data[0].population)}</td>
                        <td>{formatPercent(data[0].deaths / data[0].cases)}</td>
                    </tr>
                </tbody>
            }
        </table>
    );
}

export default Counter;