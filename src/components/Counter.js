import React, {useState} from 'react';
import './Counter.css';

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatPercent = (number) => {
    return (Number.parseFloat(number) * 100).toFixed(2).toString() + "%";
}

const Counter = ({data}) => {
    const [ extend, setExtend ] = useState(false);

    return (
        <tbody className="counter">
            <tr>
                <td><strong>{data[0].name}</strong>:</td>
                <td>{formatNumber(data[0].cases)}</td>
                <td>{formatNumber(data[0].deaths)}</td>
                <td>{formatNumber(data[0].population)}</td>
                <td>{formatPercent(data[0].cases / data[0].population)}</td>
                <td>{formatPercent(data[0].deaths / data[0].population)}</td>
                <td>{formatPercent(data[0].deaths / data[0].cases)}</td>
                <td><button onClick={() => setExtend(!extend)}>{extend ? '\u2191' : '\u2193'}</button></td>
            </tr>
            {extend ?
                data.map((country, i) => i !== 0 ?
                    <tr key={country.name}>
                        <td>{country.name}:</td>
                        <td>{formatNumber(country.cases)}</td>
                        <td>{formatNumber(country.deaths)}</td>
                        <td>{formatNumber(country.population)}</td>
                        <td>{formatPercent(country.cases / country.population)}</td>
                        <td>{formatPercent(country.deaths / country.population)}</td>
                        <td>{formatPercent(country.deaths / country.cases)}</td>
                    </tr>
                : null)
            : null }
        </tbody>
    );
}

export default Counter;