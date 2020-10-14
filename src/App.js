import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Counter from './components/Counter'
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

const EUCountries = ["AT", "BE", "BG", "HR", "CY", "CZ", "DK", "EE", "FI", "FR", "DE", "EL", "HU", "IE", "IT", "LV", "LT", "LU", "MT", "NL", "PL", "PT", "RO", "SK", "SI", "ES", "SE"];

function App() {
    const [ covidUS, setCovidUS ] = useState({cases: 0, deaths: 0, population: 0});
    const [ covidEU, setCovidEU ] = useState({cases: 0, deaths: 0, population: 0});
    useEffect (() => {
        covidService.getData().then(data => {
            let totCasesUS = 0;
            let totDeathsUS = 0;
            let popUS = 0;
            let totCasesEU = 0;
            let totDeathsEU = 0;
            let totPopEU = 0;
            let countedCountries = [];
            for (let item of data) {
                if (item.geoId === "US") {
                    totCasesUS += item.cases;
                    totDeathsUS += item.deaths;
                    if (popUS === 0)
                        popUS = item.popData2019;
                }
                else if (EUCountries.includes(item.geoId)) {
                    totCasesEU += item.cases;
                    totDeathsEU += item.deaths;
                    if (!countedCountries.includes(item.geoId)) {
                        countedCountries.push(item.geoId);
                        totPopEU += item.popData2019;
                    }
                }
            }
            setCovidUS({ cases: totCasesUS, deaths: totDeathsUS, population: popUS });
            setCovidEU({ cases: totCasesEU, deaths: totDeathsEU, population: totPopEU});
        });
    }, []);



    return (
    <div className="App">
        <CounterTable data={[{country: "US", covidData: covidUS}, {country: "EU", covidData: covidEU}]} />
    </div>
  );
}

export default App;
