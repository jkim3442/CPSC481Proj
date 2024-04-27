import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';

const markers = {
  CA: {
    capital: 'Sacramento',
    coordinates: [-121.493629, 38.576668],
  },
  FL: {
    capital: 'Tallahassee',
    coordinates: [-84.281296, 30.438118],
  },
  HI: {
    capital: 'Honolulu',
    coordinates: [-157.857376, 21.307442],
  },
  NY: {
    capital: 'Albany',
    coordinates: [-73.757874, 42.652843],
  },
};

const geoUrl = '/states.json';

function MapChart() {
  console.log('- <MapChart>');
  const [statePicked, setStatePicked] = useState(undefined);

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

          {Object.entries(markers).map(([state, value]) => (
            <Marker key={state} coordinates={value.coordinates}>
              <circle r={5} fill="#E42A1D" stroke="#fff" strokeWidth={2} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
              >
                {value.capital}
              </text>
            </Marker>
          ))}
          <Line
            stroke="#FF5533"
            coordinates={[markers.CA.coordinates, markers.FL.coordinates]}
          />
          <Line
            from={markers.CA.coordinates}
            to={markers.NY.coordinates}
            stroke="#FF5533"
          />
          <Line
            from={markers.CA.coordinates}
            to={markers.HI.coordinates}
            stroke="#FF5533"
          />
          <Line
            stroke="#005533"
            coordinates={[markers.FL.coordinates, markers.NY.coordinates]}
          />
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}

export default MapChart;
