import React from 'react';
import Counter from './Counter'

const CounterTable = ({data}) => {

    return (
        <div>
            <table style={{marginLeft: "auto", marginRight: "auto"}}>
                <tbody>
                    <tr>
                        {data.map(item => <td key={item.country} ><Counter country={item.country} covid={item.covidData} /> </td>)}
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CounterTable;