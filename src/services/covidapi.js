import axios from 'axios'

const EcdcApi = "https://cors-anywhere.herokuapp.com/https://opendata.ecdc.europa.eu/covid19/casedistribution/json";

const getData = () => {
    const request = axios.get(EcdcApi);
    return request.then(response => response.data.records);
}

export default { getData }