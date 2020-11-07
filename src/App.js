import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { useQuery } from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";
import Territory from "./components/Territory";
import covidService from "./services/covidService";

function App() {

    const { data: europeData } = useQuery('europe', covidService.getEuropeData);
    const { data: americaData } = useQuery('america', covidService.getAmericaData);

    return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/:territory'>
                    <Territory covidData={[...americaData ?? [], ...europeData ?? []]} />
                </Route>
                <Route path="/">
                    <CounterTable europeData={europeData ?? []} americaData={americaData ?? []} />
                </Route>
            </Switch>
        </BrowserRouter>
        <Timestamp />
        <ReactQueryDevtools initialIsOpen />
    </div>
  );
}

export default App;
