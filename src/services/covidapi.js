import axios from 'axios'
import US from '../assets/countries.json'

const proxy = "https://cors-anywhere.herokuapp.com/";        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
const CdcApi = "https://data.cdc.gov/resource/9mfq-cb36.json";
const CensusApi = "https://api.census.gov/data/2010/dec/sf1?get=P001001,NAME&for=state";

const getEuropeData = () => {
    const request = axios.get(proxy + EcdcApi);
    return request.then(response => response.data.records);
}

const getAmericaData = () => {
    const initialRequest = axios.get(CdcApi + "?$select=max(submission_date)");
    const populationRequest = axios.get(CensusApi); // Request to Census API
    return populationRequest.then(response => {
       const pops = response.data;
       return initialRequest.then(response => {
            const latestDate = new Date(Date.parse(response.data[0].max_submission_date));
            const dataRequest = axios.get(CdcApi + `?submission_date=${latestDate.getFullYear()}-${latestDate.getMonth()}-${latestDate.getDate()}`);
            return dataRequest.then(response => {
                let data = response.data;
                for (let item of data) {
                   const fullName = US[item.state];
                   const popObj = pops.find(i => i[1] === fullName);
                   if (!popObj)
                       continue;
                   item.Population = popObj[0];
                }
                return data;
            });
       });
    });
}

export default { getEuropeData, getAmericaData }