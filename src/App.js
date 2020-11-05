import React, {useEffect, useState} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";
import Territory from "./components/Territory";
import covidService from "./services/covidService";

function App() {
    const [ europeData, setEuropeData ] = useState([]);
    const [ americaData, setAmericaData ] = useState([]);

    useEffect(() => {
        covidService.getEuropeData().then(data => setEuropeData(data));
        covidService.getAmericaData().then(data => setAmericaData(data));
    }, []);

    return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/:territory'>
                    <Territory europeData={europeData} americaData={americaData} />
                </Route>
                <Route path="/">
                    <CounterTable europeData={europeData} americaData={americaData} />
                </Route>
            </Switch>
        </BrowserRouter>
        <Timestamp />
    </div>
  );
}

export default App;
