import React, {useState, useEffect} from 'react';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

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
    </div>
  );
}

export default App;
