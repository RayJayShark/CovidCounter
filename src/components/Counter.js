import React from 'react';
import DataTable from 'react-data-table-component';
import './Counter.css';

const Counter = ({data, tableData, columns}) => {

    return (
        <DataTable
            columns={columns}
            data={tableData[data.name][1]}
            striped={true}
            theme="dark"
        />
    );
}

export default Counter;