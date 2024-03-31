import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";



export function BarChart(props) {
  const { offsetX, offsetY, data, height, width, selectedAirline: selectedAirlineID, setSelectedAirline: setSelectedAirlineID } = props;

  const maxCount = Math.max(...data.map((d) => d.Count));
  const xScale = scaleLinear().range([0, width]).domain([0, maxCount]).nice();
  const yScale = scaleBand().range([0, height]).domain(data.map((d) => d.AirlineName)).padding(0.2);
  const color = (d) => d.AirlineID === selectedAirlineID ? "#992a5b" : "#2a5599";
  const onMouseOver = (d) => setSelectedAirlineID(d.AirlineID);
  const onMouseOut = () => setSelectedAirlineID(null);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {data.map((d) => (
        <rect
          key={d.AirlineID}
          x={0}
          y={yScale(d.AirlineName)}
          width={xScale(d.Count)}
          height={yScale.bandwidth()}
          stroke="black"
          fill={color(d)}
          onMouseOver={() => onMouseOver(d)}
          onMouseOut={onMouseOut}
        />
      ))}
      <XAxis xScale={xScale} width={width} height={height} />
      <YAxis yScale={yScale} height={height} offsetX={offsetX} />
    </g>
  );
}

