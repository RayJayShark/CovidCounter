import React, {useState, useEffect} from 'react';
import './App.css';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

function App() {
    const [ covidData, setCovidData ] = useState([]);
    const [ extend, setExtend ] = useState(false);

    useEffect (() => {
        covidService.getEuropeData().then(data => {
            setCovidData(data);
        });
    }, []);

    return (
    <div className="App">
        <button onClick={() => setExtend(!extend)}>{ extend ? "Hide" : "Extend" }</button>
        <CounterTable data={covidData} extend={extend} />
    </div>
  );
}

export default App;
