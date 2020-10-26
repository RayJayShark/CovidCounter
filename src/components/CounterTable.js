import React from 'react';
import DataTable from 'react-data-table-component';
import Counter from './Counter'

const formatNumber = (number) => {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const formatPercent = (number) => {
    return (Number.parseFloat(number) * 100).toFixed(2).toString() + "%";
}

const columns = [
    {
        name: "Area",
        selector: "name",
        sortable: true,
    },
    {
        name: "Cases",
        selector: "cases",
        format: item => formatNumber(item.cases),
        sortable: true,
    },
    {
        name: "Deaths",
        selector: "deaths",
        format: item => formatNumber(item.deaths),
        sortable: true,
    },
    {
        name: "Population",
        selector: "population",
        format: item => formatNumber(item.population),
        sortable: true,
    },
    {
        name: "Ratio (Cases/Population)",
        selector: item => formatPercent(item.cases / item.population),
        sortable: true,
    },
    {
        name: "Ratio (Deaths/Population)",
        selector: item => formatPercent(item.deaths / item.population),
        sortable: true,
    },
    {
        name: "Ratio (Deaths/Cases)",
        selector: item => formatPercent(item.deaths / item.cases),
        sortable: true,
    }
];

const CounterTable = ({allData}) => {
    return (
       <DataTable
            title="COVID19 Cases by Region"
            columns={columns}
            data={[allData.US[0], allData.EU[0]]}
            striped={true}
            theme="dark"
            progressPending={allData.US.length === 0 || allData.EU.length === 0}
            expandableRows={true}
            expandableRowsComponent={<Counter tableData={allData} columns={columns} />}
        />
    );
}

export default CounterTable;