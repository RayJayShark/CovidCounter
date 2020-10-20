import React, {useState, useEffect} from 'react';
import './App.css';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

function App() {
    const [ americaData, setAmericaData ] = useState([]);
    const [ europeData, setEuropeData ] = useState([]);
    const [ extend, setExtend ] = useState(false);

    useEffect (() => {
        covidService.getEuropeData().then(data => {
            setEuropeData(data);
        });
        covidService.getAmericaData().then(data =>{
            setAmericaData(data);
        });
    }, []);

    return (
    <div className="App">
        {europeData.length === 0 || americaData.length === 0 ?
            <div>Loading...</div>
            :
            <div>
                <button onClick={() => setExtend(!extend)}>{extend ? "Hide" : "Extend"}</button>
                <CounterTable europeData={europeData} americaData={americaData} extend={extend} />
            </div>
        }
    </div>
  );
}

export default App;
