import React, {useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import {QueryCache, ReactQueryCacheProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query-devtools'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";
import Territory from "./components/Territory";

const queryCache = new QueryCache({
    defaultConfig: {
        queries: {
            staleTime: 3600000
        }
    }
});

function App() {

    useEffect(() => {
        document.title = "CovidCounter"
    }, []);

    return (
    <div>
        <ReactQueryCacheProvider queryCache={queryCache}>
            <BrowserRouter>
                <Switch>
                    <Route path='/:territory'>
                        <Territory />
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
