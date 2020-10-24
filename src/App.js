import React, {useState, useEffect} from 'react';
import './App.css';
import covidService from './services/covidapi'
import CounterTable from "./components/CounterTable";

function App() {
    const [ americaData, setAmericaData ] = useState([]);
    const [ europeData, setEuropeData ] = useState([]);

    useEffect (() => {
        covidService.getEuropeData().then(data => {
            setEuropeData(data);
        });
        covidService.getAmericaData().then(data =>{
            setAmericaData(data);
        });
    }, []);

    return (
    <div>
        {europeData.length === 0 || americaData.length === 0 ?
            <div>Loading...</div>
            :
            <div>
                <CounterTable europeData={europeData} americaData={americaData} />
            </div>
        }
    </div>
  );
}

export default App;
