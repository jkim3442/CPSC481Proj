import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';

const markers = [
  {
    markerOffset: -10,
    name: 'Sacramento',
    coordinates: [-121.493629, 38.576668],
  },
  {
    markerOffset: -20,
    name: 'Tallahassee',
    coordinates: [-84.281296, 30.438118],
  },
  {
    markerOffset: -20,
    name: 'Honolulu',
    coordinates: [-157.857376, 21.307442],
  },
  {
    markerOffset: -20,
    name: 'Austin',
    coordinates: [-97.740349, 30.27467],
  },
];

const geoUrl = '/states.json';

function MapChart() {
  console.log('- <MapChart>');

  return (
    <>
      <ComposableMap projection="geoAlbersUsa">
        <ZoomableGroup>
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => {
                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill="#FF5533"
                    stroke="#000000"
                    style={{
                      default: {
                        fill: '#EEE',
                      },
                      hover: {
                        fill: '#F53',
                      },
                      pressed: {
                        fill: '#E42',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset }) => (
            <Marker key={name} coordinates={coordinates} id={name}>
              <circle r={5} fill="#E42A1D" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
              >
                {name}
              </text>
            </Marker>
          ))}
          <Line
            from={[-121.493629, 38.576668]}
            to={[-97.740349, 30.27467]}
            strokeLinecap="round"
            stroke="#FF5533"
          />
          <Line
            from={[-121.493629, 38.576668]}
            to={[-157.857376, 21.307442]}
            strokeLinecap="round"
            stroke="#FF5533"
          />
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}

export default MapChart;
