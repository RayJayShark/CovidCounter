import axios from 'axios'
import {US} from '../assets/countries.json'

const proxy = "https://cors-anywhere.herokuapp.com/";        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
const CdcApi = "https://data.cdc.gov/resource/9mfq-cb36.json";
const CensusApi = "https://api.census.gov/data/2010/dec/sf1?get=P001001,NAME&for=state";

const getEuropeData = () => {
    const request = axios.get(proxy + EcdcApi);
    return request.then(response => response.data.records);
}

const getAmericaData = async () => {
    const initialRequest = axios.get(CdcApi + "?$select=max(submission_date)");
    const populationRequest = axios.get(CensusApi); // Request to Census API
    let pops = [];
    let latestDate = {};

    await populationRequest.then(response => pops = response.data);
    pops.shift()

    await initialRequest.then(response => latestDate = new Date(Date.parse(response.data[0].max_submission_date)));

    const dataRequest = axios.get(CdcApi + `?submission_date=${latestDate.getFullYear()}-${latestDate.getMonth() + 1}-${latestDate.getDate()}`);
    return dataRequest.then(response => {
        let data = response.data;
        let badStates = [];
        for (let item of data) {
            const fullName = US[item.state];
            if (!fullName) {
                badStates.push(item.state);
                continue;
            }
            const popObj = pops.find(i => i[1] === fullName);
            item.Population = popObj[0];
        }
        data = data.filter(item => !badStates.includes(item.state))
        return data;
    });
}

export default { getEuropeData, getAmericaData }