import axios from 'axios'
import {EU, US} from '../assets/countries.json'

const proxy = "https://cors-anywhere.herokuapp.com/";        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
const CdcApi = "https://data.cdc.gov/resource/9mfq-cb36.json";
const CensusApi = "https://api.census.gov/data/2010/dec/sf1?get=P001001,NAME&for=state";


const getEuropeData = async () => {
    let preData = [];
    await axios.get(proxy + EcdcApi).then(response => preData = response.data.records);

    /* Filters out countries not in the EU */
    let filteredData = preData.filter(item => EU.includes(item.geoId));

    /* Format data into uniform objects */
    let formattedData = [];
    for (let item of filteredData) {
        const newObj = {
            name: item.countriesAndTerritories,
            geoId: item.geoId,
            date: item.dateRep,
            cases: Number(item.cases),
            deaths: Number(item.deaths),
            population: Number(item.popData2019)
        }
        formattedData.push(newObj);
    }
    return formattedData;
}

const getAmericaData = async () => {
    const populationRequest = axios.get(CensusApi); // Request to Census API
    let pops = [];

    await populationRequest.then(response => pops = response.data);
    pops.shift()    // First item of array, contains column names

    const dataRequest = await axios.get(CdcApi + "?$where=tot_cases>0&$limit=50000"); // Query for avoiding items with no cases and setting the max limit (50,000)

    /* Filters the US territories without population data */
    let data = dataRequest.data;
    let filteredData;
    let badStates = [];
    for (let item of data) {
        const fullName = US[item.state];
        if (!fullName) {
            badStates.push(item.state);
            continue;
        }
        const popObj = pops.find(i => i[1] === fullName);
        item.population = popObj[0];
    }
    filteredData = data.filter(item => !badStates.includes(item.state))

    /* Formats data into uniform objects */
    let formattedData = [];
    for (let item of filteredData) {
        const newObj = {
            name: US[item.state],
            geoId: item.state,
            date: item.submission_date,
            cases: Number(item.new_case),
            deaths: Number(item.new_death),
            population: Number(item.population)
        }
        formattedData.push(newObj);
    }
    return formattedData;
}

export default { getEuropeData, getAmericaData }