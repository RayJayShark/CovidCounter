import React from 'react';
import {useParams} from 'react-router-dom';
import {useQuery} from "react-query";
import covidService from "../services/covidService";

const Territory = ({covidData}) => {
    const { territory } = useParams();

    const { data: europeData, isLoading: europeLoading } = useQuery('europe', covidService.getEuropeData);
    const { data: americaData,isLoading: americaLoading } = useQuery('america', covidService.getAmericaData);
    const loaded = !europeLoading && !americaLoading;

    let territoryData;
    if (loaded) {
        const covidData = [...europeData, ...americaData];
        territoryData = covidData.filter(item => item.name.toLowerCase() === territory.toLowerCase());
    }


    return (
        <div style={{color: '#FFFFFF'}}>
            <h1>{territory}</h1>
            <strong>Cases:</strong> {loaded ? territoryData.reduce(((acc, cur) => acc + cur.cases), 0) : "Loading..."}<br/>
            <strong>Deaths:</strong> {loaded ? territoryData.reduce(((acc, cur) => acc + cur.deaths), 0) : "Loading..."}<br/>
            <strong>Population:</strong> {loaded ? territoryData[0].population : "Loading..."}
        </div>
    )
}

export default Territory;