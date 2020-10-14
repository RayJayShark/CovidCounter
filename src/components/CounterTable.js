import React from 'react';
import Counter from './Counter'

const EUCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];

const CounterTable = ({data}) => {
    
    const dataUS = [{
        country: "total",
        cases: 0,
        deaths: 0,
        population: 0
    }];
    const dataEU = [{
        country: "total",
        cases: 0,
        deaths: 0,
        population: 0
    }];

    for (let item of data) {
        if (item.geoId === "US") {
            const total = dataUS[0];
            const countryObj = dataUS.find(i => i.country === item.geoId);
            if (countryObj){
                countryObj.cases += item.cases;
                countryObj.deaths += item.deaths;
            }
            else {
                dataUS.push({
                    country: item.geoId,
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
            const countryObj = dataEU.find(i => i.country === item.geoId);
            if (countryObj){
                countryObj.cases += item.cases;
                countryObj.deaths += item.deaths;
            }
            else {
                dataEU.push({
                    country: item.geoId,
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
                        <td><Counter region={"US"} data={dataUS} /></td>
                        <td><Counter region={"EU"} data={dataEU} /></td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CounterTable;