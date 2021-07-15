import React from 'react'
import './map.css'
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import { showDataOnMap } from '../../functions/functions';


const Map = ({ countries, casesType, center, zoom }) => {

    // console.log("map :>", countries, casesType, center, zoom)
    return (
        <div className="map">
            <MapContainer
                casesType={casesType}
                className="map"
                center={center}
                zoom={zoom}
            // scrollWheelZoom={false}
            >
                <TileLayer
                    attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {showDataOnMap(countries, casesType)}
            </MapContainer>
        </div>
    )
}

export default Map;
