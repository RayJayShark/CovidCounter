import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import CounterTable from "./components/CounterTable";
import Timestamp from "./components/Timestamp";
import Area from "./components/Area";

function App() {

    return (
    <div>
        <BrowserRouter>
            <Switch>
                <Route path='/:country'>
                    <Area />
                </Route>
                <Route path="/">
                    <CounterTable />
                </Route>
            </Switch>
        </BrowserRouter>
        <Timestamp />
    </div>
  );
}

export default App;
