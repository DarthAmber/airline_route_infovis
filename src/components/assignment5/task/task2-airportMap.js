import React from "react";
import { geoPath, geoMercator } from "d3-geo";
import { Routes } from './routes'
import { count } from "d3";


function AirportMap(props) {
  const { width, height, countries, airports, routes, selectedAirlineID } = props;
  const projection = geoMercator()
  .scale(97)
  .translate([width / 2, height / 2 + 20]);

  const path = geoPath().projection(projection);

  return (
    <g>
      {countries.features.map((feature) => (
        <path key={feature.properties.name} d={path(feature)} stroke="#ccc" fill="#eee" />
      ))}
      {airports.map((airport) => (
        <circle
          key={airport.AirportID}
          cx={projection([airport.Longitude, airport.Latitude])[0]}
          cy={projection([airport.Longitude, airport.Latitude])[1]}
          r={1}
          fill="#2a5599"
        />
      ))}
      <Routes projection={projection} routes={routes} selectedAirlineID={selectedAirlineID} />
    </g>
  );
}


export { AirportMap }
