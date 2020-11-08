import React from 'react';
import {useQueryCache} from "react-query";

const Timestamp = () => {

    const queryCache = useQueryCache();
    const europeQuery = queryCache.getQuery('europe');
    const americaQuery = queryCache.getQuery('america');
    const latestTime = europeQuery.state.updatedAt > americaQuery.state.updatedAt ?
        europeQuery.state.updatedAt
        :
        americaQuery.state.updatedAt;
    const fetchTime = new Date(latestTime);

    return (
        <footer style={{color: '#FFFFFF'}}>
            <br/><>Date retrieved: </>
            {europeQuery.state.isFetching ||  americaQuery.state.isFetching ?
                '...'
                :
                fetchTime.toDateString() + ' ' + fetchTime.toTimeString()
            }
        </footer>
    );
}

export default Timestamp;