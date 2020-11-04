import React, {useState, useEffect} from 'react';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";

function App() {
    const [ americaData, setAmericaData ] = useState([]);
    const [ europeData, setEuropeData ] = useState([]);

    useEffect (() => {
        covidService.getEuropeData().then(data => {
            setEuropeData([
                data.shift(),
                data
            ]);
        });
        covidService.getAmericaData().then(data =>{
            setAmericaData([
                data.shift(),
                data
            ]);
        });
    }, []);

    return (
    <div>
        <CounterTable allData={{US: americaData, EU: europeData}} />
        <Timestamp />
    </div>
  );
}

export default App;
