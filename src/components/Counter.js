import React from 'react';
import DataTable from 'react-data-table-component';
import {useHistory} from "react-router-dom";

const Counter = ({data, tableData, columns}) => {
    const history = useHistory();

    return (
        <DataTable
            columns={columns}
            data={tableData[data.name][1]}
            striped={true}
            theme="dark"
            highlightOnHover={true}
            pointerOnHover={true}
            onRowDoubleClicked={(row) => history.push("/" + row.name)}
        />
    );
}

export default Counter;