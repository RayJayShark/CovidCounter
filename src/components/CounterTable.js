import React from 'react';
import Counter from './Counter'

const EUCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];

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
            const countryObj = dataUS.find(i => i.name === item.geoId);
            if (countryObj){
                countryObj.cases += item.cases;
                countryObj.deaths += item.deaths;
            }
            else {
                dataUS.push({
                    name: item.geoId,
                    cases: item.cases,
                    deaths: item.deaths,
                    population: item.popData2019
                });
                total.population += item.popData2019;
            }
            total.cases += item.cases;
            total.deaths += item.deaths;
        }
        else if (EUCountries.includes(item.geoId)) {
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