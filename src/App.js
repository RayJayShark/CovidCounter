import React, {useState, useEffect} from 'react';
import './App.css';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

function App() {
    const [ covidData, setCovidData ] = useState([]);

    useEffect (() => {
        covidService.getData().then(data => {
            setCovidData(data);
        });
    }, []);

    return (
    <div className="App">
        <CounterTable data={covidData}/>
    </div>
  );
}

export default App;
