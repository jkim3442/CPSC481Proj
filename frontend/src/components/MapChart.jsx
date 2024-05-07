import { useState } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
  ZoomableGroup,
} from 'react-simple-maps';

import markers from '../markers';

const geoUrl = '/states.json';
const pickedColorPath = '#50d45d';
const colorPath = '#87877f';

function MapChart() {
  console.log('<MapChart>');
  const [statePicked, setStatePicked] = useState(undefined);

  function handleStateClick(stateName) {
    setStatePicked(stateName);
  }

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
                    onClick={() => {
                      handleStateClick(geo.properties.name);
                    }}
                    style={{
                      default: {
                        fill: '#EEE',
                      },
                      hover: {
                        fill: '#a1d9a0',
                      },
                    }}
                  />
                );
              })
            }
          </Geographies>

          {/* render markers */}
          {Object.entries(markers).map(([state, value]) => (
            <Marker key={state} coordinates={value.coordinates}>
              <circle r={7} fill="#E42A1D" stroke="#fff" strokeWidth={0} />
              <text
                textAnchor="middle"
                y={-10}
                style={{ fontFamily: 'system-ui', fill: '#5D5A6D' }}
              >
                {value.capital}
              </text>
            </Marker>
          ))}
        </ZoomableGroup>
      </ComposableMap>
    </>
  );
}

export default MapChart;
