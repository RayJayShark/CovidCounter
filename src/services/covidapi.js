import axios from 'axios'

const proxy = "https://cors-anywhere.herokuapp.com/";        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
const CdcApi = "https://data.cdc.gov/resource/9mfq-cb36.json";

const getEuropeData = () => {
    const request = axios.get(proxy + EcdcApi);
    return request.then(response => response.data.records);
}

const getAmericaData = () => {
    const initialRequest = axios.get(CdcApi + "?$select=max(submission_date)");
    return initialRequest.then(response => {
        const latestDate = new Date(Date.parse(response.data[0].max_submission_date));
        const dataRequest = axios.get(CdcApi + `?submission_date=${latestDate.getFullYear()}-${latestDate.getMonth()}-${latestDate.getDate()}`);
        return dataRequest.then(response => response.data);
    });
}

export default { getEuropeData, getAmericaData }