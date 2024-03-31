import React from "react";
import { max, scaleBand, scaleLinear } from "d3";
import { XAxis, YAxis } from "./axes";


function XAxis({ yScale, height, offsetX }) {
  const tickFormat = (tick) => tick; // Customize tick formatting if needed

  return (
    <g transform={`translate(${offsetX}, 0)`}>
      <line x1={0} y1={0} x2={0} y2={height} stroke="black" />
      {yScale.domain().map((tick) => (
        <g key={tick} transform={`translate(${0}, ${yScale(tick)})`}>
          <line x1={-5} x2={0} y1={yScale.bandwidth() / 2} y2={yScale.bandwidth() / 2} stroke="black" />
          <text style={{ textAnchor: 'start', fontSize: '10px' }} x={-offsetX + 10} y={yScale.bandwidth() / 2}>
            {tickFormat(tick)}
          </text>
        </g>
      ))}
    </g>
  );
}


function YAxis({ xScale, width, height }) {
  const tickFormat = (tick) => tick; // Customize tick formatting if needed

  return (
    <g transform={`translate(0, ${height})`}>
      <line x2={width} y2={0} stroke="black" />
      {xScale.ticks(5).map((tick) => (
        <g key={tick} transform={`translate(${xScale(tick)}, 0)`}>
          <line y2={10} stroke="black" />
          <text style={{ textAnchor: 'end', fontSize: '10px' }} x={5} y={20}>
            {tickFormat(tick)}
          </text>
        </g>
      ))}
    </g>
  );
}

export function BarChart (props) {

    const {offsetX, offsetY, data, height, width, selectedAirlineID, setSelectedAirlineID} = {
      "offsetX": 130,
      "offsetY": 10,
      "height": 340,
      "width": 210,
      "data": [
        {
          "AirlineID": "4296",
          "AirlineName": "Ryanair",
          "Count": 2482
        },
        {
          "AirlineID": "24",
          "AirlineName": "American Airlines",
          "Count": 2340
        },
        {
          "AirlineID": "2009",
          "AirlineName": "Delta Air Lines",
          "Count": 1977
        },
        {
          "AirlineID": "5265",
          "AirlineName": "US Airways",
          "Count": 1947
        },
        {
          "AirlineID": "1767",
          "AirlineName": "China Southern Airlines",
          "Count": 1422
        },
        {
          "AirlineID": "751",
          "AirlineName": "Air China",
          "Count": 1236
        },
        {
          "AirlineID": "1758",
          "AirlineName": "China Eastern Airlines",
          "Count": 1211
        },
        {
          "AirlineID": "4547",
          "AirlineName": "Southwest Airlines",
          "Count": 1140
        },
        {
          "AirlineID": "2297",
          "AirlineName": "easyJet",
          "Count": 1130
        },
        {
          "AirlineID": "137",
          "AirlineName": "Air France",
          "Count": 1063
        },
        {
          "AirlineID": "3320",
          "AirlineName": "Lufthansa",
          "Count": 919
        },
        {
          "AirlineID": "596",
          "AirlineName": "Alitalia",
          "Count": 877
        },
        {
          "AirlineID": "2822",
          "AirlineName": "Iberia Airlines",
          "Count": 829
        },
        {
          "AirlineID": "3090",
          "AirlineName": "KLM Royal Dutch Airlines",
          "Count": 826
        },
        {
          "AirlineID": "4611",
          "AirlineName": "Shenzhen Airlines",
          "Count": 789
        },
        {
          "AirlineID": "214",
          "AirlineName": "Air Berlin",
          "Count": 786
        },
        {
          "AirlineID": "1316",
          "AirlineName": "AirTran Airways",
          "Count": 726
        },
        {
          "AirlineID": "330",
          "AirlineName": "Air Canada",
          "Count": 701
        },
        {
          "AirlineID": "4951",
          "AirlineName": "Turkish Airlines",
          "Count": 640
        }
      ],
      "selectedAirline": null
    };
    // Task 1: TODO
    // 1. find the maximum of the Count attribute in the data
    // 2. define the xScale and yScale
    // 3. return the bars; (Remember to use data.map());
    // 4. return <XAxis/> and <YAxis/>

    // Task 3. TODO
    // 1. define an arrow function color; it takes a data item, d, as input.
    // If d.AirlineID is equal to the selectedAirlineID, it returns "#992a5b";
    // otherwiese, it returns "#2a5599".
    // 2. define a function onMouseOver; it takes a data item, d, as input,
    // and sets the selectedAirlineID be the d.AirlineID
    // 3. define a function onMouseOut; it has no argument, and sets the selectedAirlineID be null.
    // 4. adding properties, onMouseOver and onMouseOut, to the <rect> tags.
    // Note: the function of the onMouseOver properties should be an arrow function
    // that wraps the onMouseOver you defined since it takes d as input.


  // 1. Find the maximum count for scaling
  const maxCount = Math.max(...data.map(d => d.Count));

  // 2. Define yScale and xScale using d3-scale
  const yScale = scaleBand()
  .domain(data.map(d => d.AirlineName))
  .range([0, height])
  .padding(0.2); // Adjust padding for bar spacing as needed

  const xScale = scaleLinear()
  .domain([0, maxCount])
  .range([0, width]);

  // 3. Define color function for bars
  const color = (d) => (d.AirlineID === selectedAirlineID ? '#992a5b' : '#2a5599');

  // 4. Define event handlers for interactivity
  const onMouseOver = (d) => setSelectedAirlineID(d.AirlineID);
  const onMouseOut = () => setSelectedAirlineID(null);

  return (
    <g transform={`translate(${offsetX}, ${offsetY})`}>
      {data.map((d) => (
        <rect
          key={d.AirlineID} // Add unique key for React reconciliation
          x={0}
          y={yScale(d.AirlineName)}
          width={xScale(d.Count)}
          height={yScale.bandwidth()}
          onMouseOver={() => onMouseOver(d)}
          onMouseOut={onMouseOut}
          stroke="black"
          fill={color(d)}
        />
      ))}
      {/* Replace with appropriate XAxis and YAxis components */}
      <XAxis yScale={yScale} height={height} offsetX={offsetX} />
      <YAxis xScale={xScale} width={width} height={height} />
    </g>
  );
}

