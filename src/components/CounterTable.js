import React from 'react';
import {useHistory} from 'react-router-dom';
import DataTable from 'react-data-table-component';
import Counter from './Counter'
import {useQuery} from "react-query";
import covidService from "../services/covidService";

const formatData = (region, data) => {
    const formattedData = [{
        name: region,
        cases: 0,
        deaths: 0,
        population: 0
    }];
    for (let item of data) {
        const total = formattedData[0];
        const countryObj = formattedData.find(i => i.geoId === item.geoId);
        if (countryObj){
            countryObj.cases += item.cases;
            countryObj.deaths += item.deaths;
        }
        else {
            formattedData.push({
                name: item.name,
                geoId: item.geoId,
                cases: item.cases,
                deaths: item.deaths,
                population: item.population
            });
            total.population += item.population;
        }
        total.cases += item.cases;
        total.deaths += item.deaths;
    }
    return formattedData;
}

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

const CounterTable = () => {
    const history = useHistory();

    const { data: europeData, isFetching: europeFetching } = useQuery('europe', covidService.getEuropeData,
        {
            initialData: [],
            initialStale: true
        });
    const { data: americaData, isFetching: americaFetching } = useQuery('america', covidService.getAmericaData,
        {
            initialData: [],
            initialStale: true
        });

    const formattedEuropeData = formatData("EU", europeData);
    const formattedAmericaData = formatData("US", americaData);

    let allData = {
        US: [
            formattedAmericaData.shift(),
            formattedAmericaData
        ],
        EU: [
            formattedEuropeData.shift(),
            formattedEuropeData
        ]
    };

    return (
       <DataTable
            title="COVID19 Cases by Region"
            columns={columns}
            data={[allData.US[0], allData.EU[0]]}
            striped={true}
            theme="dark"
            progressPending={europeFetching || americaFetching}
            expandableRows={true}
            expandableRowsComponent={<Counter tableData={allData} columns={columns} />}
            highlightOnHover={true}
            pointerOnHover={true}
            onRowDoubleClicked={(row) => history.push("/" + row.name)}
        />
    );
}

export default CounterTable;