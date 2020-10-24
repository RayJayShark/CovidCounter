import React from 'react';
import Counter from './Counter'

const CounterTable = ({americaData, europeData, extend}) => {

    return (
        <div>
            <table>
                <thead>
                    <tr style={{backgroundColor: '#c2c2c2'}}>
                        <th>Area:</th>
                        <th>Cases:</th>
                        <th>Deaths:</th>
                        <th>Total Population:</th>
                        <th>Ratio (Cases/Population):</th>
                        <th>Ratio (Deaths/Population):</th>
                        <th>Ratio (Deaths/Cases):</th>
                    </tr>
                </thead>
                <Counter data={europeData} extend={extend} />
                <Counter data={americaData} extend={extend} />
            </table>
        </div>
    );
}

export default CounterTable;