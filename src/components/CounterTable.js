import React from 'react';
import Counter from './Counter'
import {US, EU} from '../assets/countries.json'

const CounterTable = ({americaData, europeData, extend}) => {

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

    for (let item of americaData) {
        dataUS.push({
            name: US[item.state],
            cases: item.tot_cases,
            deaths: item.tot_death,
            population: item.population
        });
        dataUS[0].cases += Number(item.tot_cases);
        dataUS[0].deaths += Number(item.tot_death);
        dataUS[0].population += Number(item.population);
    }

    for (let item of europeData) {
        if (EU.includes(item.geoId)) {
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
            <table>
                <tbody>
                    <tr>
                        <td style={{verticalAlign: "top"}}><Counter data={dataEU} extend={extend} /></td>
                    </tr>
                    <tr>
                        <td style={{verticalAlign: "top"}}><Counter data={dataUS} extend={extend} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CounterTable;