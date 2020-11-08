import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {QueryCache, ReactQueryCacheProvider, useQuery} from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";
import Territory from "./components/Territory";
import covidService from "./services/covidService";

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            staleTime: 3600000
        }
    }
});

function App() {

    const { data: europeData } = useQuery('europe', covidService.getEuropeData);
    const { data: americaData } = useQuery('america', covidService.getAmericaData);

    return (
    <div>
        <ReactQueryCacheProvider queryCache={queryCache}>
            <BrowserRouter>
                <Switch>
                    <Route path='/:territory'>
                        <Territory covidData={[...americaData ?? [], ...europeData ?? []]} />
                    </Route>
                    <Route path="/">
                        <CounterTable />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Timestamp />
            <ReactQueryDevtools initialIsOpen />
        </ReactQueryCacheProvider>

    </div>
  );
}

export default App;
