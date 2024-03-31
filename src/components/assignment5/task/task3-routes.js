import React from "react";

function Routes(props) {
  const { projection, routes, selectedAirlineID } = props;

  const filteredRoutes = selectedAirlineID ? routes.filter((route) => route.AirlineID === selectedAirlineID) : [];

  return (
    <g>
      {filteredRoutes.map((route) => (
        <line
          key={route.ID}
          x1={projection([route.SourceLongitude, route.SourceLatitude])[0]}
          y1={projection([route.SourceLongitude, route.SourceLatitude])[1]}
          x2={projection([route.DestLongitude, route.DestLatitude])[0]}
          y2={projection([route.DestLongitude, route.DestLatitude])[1]}
          stroke="#992a2a"
          opacity={0.1}
        />
      ))}
    </g>
  );
}

export { Routes }
