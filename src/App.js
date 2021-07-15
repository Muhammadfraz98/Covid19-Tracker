
import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './App.css'
import {
    FormControl,
    MenuItem,
    Select,
    Card,
    CardContent,
    Typography,
} from "@material-ui/core";
import "leaflet/dist/leaflet.css";

//Components
import InfoBox from "./components/infoboxes/infoBox"
import Map from './components/map/map'
import Table from './components/Table/table'
import { sortData, prettyPrintStat } from './functions/functions';
import LineGraph from './components/lineGraph/lineGraph';




function App() {

    const [countries, setCountries] = useState([])
    const [country, setCountry] = useState("worldwide")
    const [countryInfo, setCountryInfo] = useState({})
    const [casesType, setCasesType] = useState("cases");
    const [tableData, setTabelData] = useState([])
    const [mapCenter, setMapCenter] = useState([34.80746, -40.4796]);
    const [zoom, setZoom] = useState(3);
    const [mapCountries, setMapCountries] = useState([]);

    useEffect(() => {
        fetch('https://disease.sh/v3/covid-19/all')
            .then(response => response.json())
            .then(data => {
                setCountryInfo(data)
            }).catch(

            )
    }, [])


    useEffect(() => {
        axios.get('https://disease.sh/v3/covid-19/countries')
            .then(res => {
                let data = res.data
                const countries = data.map((country) => (
                    {
                        name: country.country,
                        value: country.countryInfo.iso3
                    }
                ))

                const sortedData = sortData(data)
                console.log("Countries :>", countries);
                setTabelData(sortedData)
                setMapCountries(data)
                setCountries(countries)
            })
            .catch(err =>
                console.log(err)
            )
    }, [])


    const onCountryChange = async (event) => {

        const countryCode = event.target.value;

        setCountry(countryCode);

        const url =
            countryCode === "worldwide"
                ? "https://disease.sh/v3/covid-19/all"
                : `https://disease.sh/v3/covid-19/countries/${countryCode}`;

        //https://disease.sh/v3/covid-19/all
        //https://disease.sh/v3/covid-19/countries/[countryCode]

        await fetch(url)
            .then((response) => response.json())
            .then((data) => {
                setCountry(countryCode);
                setCountryInfo(data);
                // console.log("DATA XD", data)
                // console.log("prev map =>", [data.countryInfo.lat, data.countryInfo.long]);
                countryCode === "worldwide"
                    ? setMapCenter([34.80746, -40.4796])
                    :
                    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
                setZoom(4);

            });

        // console.log(countryInfo);
    };

    return (

        <div className="App">

            <div className="app__left">
                {/* TITLE + SELECT DROPDOWN */}
                <div className="app__header">
                    {/* <Typography variant="h4" component="h3" color="primary">Covid-19 Tracker</Typography> */}
                    <h1 > Covid-19 Tracker </h1>
                    <FormControl className="app__dropdown">
                        <Select variant="outlined" value={country} onChange={e => onCountryChange(e)}>
                            <MenuItem value="worldwide"> WORLD WIDE </MenuItem>
                            {
                                countries.map((country) => (
                                    <MenuItem value={country.value}> {country.name} </MenuItem>
                                ))
                            }
                        </Select>
                    </FormControl>
                </div>
                <div className="app__stats">
                    {/* InfoBoxes */}
                    <InfoBox
                        isBlue
                        active={casesType === "cases"}
                        onClick={(e) => setCasesType('cases')}
                        title="CoronaVirus Cases"
                        total={countryInfo.cases}
                        cases={prettyPrintStat(countryInfo.todayCases)}
                    />
                    {/* InfoBoxes */}
                    <InfoBox
                        active={casesType === "recovered"}
                        onClick={(e) => setCasesType('recovered')}
                        title="Recovered"
                        total={countryInfo.recovered}
                        cases={prettyPrintStat(countryInfo.todayRecovered)}
                    />
                    {/* InfoBoxes */}
                    <InfoBox
                        isRed
                        active={casesType === "deaths"}
                        onClick={(e) => setCasesType('deaths')}
                        title="Deaths"
                        total={countryInfo.deaths}
                        cases={prettyPrintStat(countryInfo.todayDeaths)}
                    />
                </div>
                {/* Map */}

                <Map
                    countries={mapCountries}
                    center={mapCenter}
                    zoom={zoom}
                    casesType={casesType}
                />

            </div>
            <Card className="app__right">
                <CardContent>
                    <h3>Live Casses By Country</h3>
                    {/* Table */}
                    <Table countries={tableData} />
                    <br /><br /><br />
                    <h3>Worldwide {casesType}</h3>
                    {/* Graph */}
                    <LineGraph casesType={casesType} />
                </CardContent>

            </Card>




        </div>
    );
}

export default App;
