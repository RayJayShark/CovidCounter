import React from 'react';
import Counter from './Counter'

const CounterTable = ({americaData, europeData, extend}) => {

    return (
        <div>
            <table>
                <tbody>
                    <tr>
                        <td style={{verticalAlign: "top"}}><Counter data={europeData} extend={extend} /></td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign: "top"}}><Counter data={americaData} extend={extend} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CounterTable;