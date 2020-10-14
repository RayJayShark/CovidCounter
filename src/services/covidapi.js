import axios from 'axios'

const proxy = "https://cors-anywhere.herokuapp.com/"        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";

const getData = () => {
    const request = axios.get(proxy + EcdcApi);
    return request.then(response => response.data.records);
}

export default { getData }