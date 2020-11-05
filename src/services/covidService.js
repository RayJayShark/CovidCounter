import axios from 'axios'
import {EU, US} from '../assets/countries.json'

const proxy = "https://cors-anywhere.herokuapp.com/";        // Proxy for 'Access-Control-Allow-Origin' error
const EcdcApi = "https://opendata.ecdc.europa.eu/covid19/casedistribution/json";
const CdcApi = "https://data.cdc.gov/resource/9mfq-cb36.json";
const CensusApi = "https://api.census.gov/data/2010/dec/sf1?get=P001001,NAME&for=state";



const getEuropeData = async () => {
    let preData = [];
    await axios.get(proxy + EcdcApi).then(response => preData = response.data.records);

    return preData.filter(item => EU.includes(item.geoId));

    /*const formattedData = [{
        name: "EU",
        cases: 0,
        deaths: 0,
        population: 0
    }];
    for (let item of preData) {
        if (EU.includes(item.geoId)) {
            const total = formattedData[0];
            const countryObj = formattedData.find(i => i.geoId === item.geoId);
            if (countryObj){
                countryObj.cases += item.cases;
                countryObj.deaths += item.deaths;
            }
            else {
                formattedData.push({
                    name: item.countriesAndTerritories,
                    geoId: item.geoId,
                    cases: Number(item.cases),
                    deaths: Number(item.deaths),
                    population: Number(item.popData2019)
                });
                total.population += item.popData2019;
            }
            total.cases += item.cases;
            total.deaths += item.deaths;
        }
    }

    return formattedData;*/
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
    let filteredData = [];
    await dataRequest.then(response => {
        let data = response.data;
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
    });

    return filteredData;

    /*
    let formattedData = [{
        name: "US",
        cases: 0,
        deaths: 0,
        population: 0
    }];
    for (let item of preData) {
        formattedData.push({
            name: US[item.state],
            cases: Number(item.tot_cases),
            deaths: Number(item.tot_death),
            population: Number(item.population)
        });
        formattedData[0].cases += Number(item.tot_cases);
        formattedData[0].deaths += Number(item.tot_death);
        formattedData[0].population += Number(item.population);
    }
    return formattedData*/
}

export default { getEuropeData, getAmericaData }