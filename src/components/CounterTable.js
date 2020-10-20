import React from 'react';
import Counter from './Counter'
import {EU} from '../assets/countries.json'

const CounterTable = ({data, extend}) => {

    const dataUS = [{
        name: "US",
        cases: 0,
        deaths: 0,
        population: 0
    }];
    const dataEU = [{
        name: "EU",
        cases: 0,
        deaths: 0,
        population: 0
    }];

    for (let item of data) {
        if (item.geoId === "US") {
            const total = dataUS[0];
            total.cases += item.cases;
            total.deaths += item.deaths;
            total.population = item.popData2019; // Temp to get population of US
        }
        else if (EU.includes(item.geoId)) {
            const total = dataEU[0];
            const countryObj = dataEU.find(i => i.geoId === item.geoId);
            if (countryObj){
                countryObj.cases += item.cases;
                countryObj.deaths += item.deaths;
            }
            else {
                dataEU.push({
                    name: item.countriesAndTerritories,
                    geoId: item.geoId,
                    cases: item.cases,
                    deaths: item.deaths,
                    population: item.popData2019
                });
                total.population += item.popData2019;
            }
            total.cases += item.cases;
            total.deaths += item.deaths;
        }
    }

    return (
        <div>
            <table style={{marginLeft: "auto", marginRight: "auto"}}>
                <tbody>
                    <tr>
                        <td style={{verticalAlign: "top"}}><Counter data={dataUS} extend={extend} /></td>
                        <td style={{verticalAlign: "top"}}><Counter data={dataEU} extend={extend} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CounterTable;