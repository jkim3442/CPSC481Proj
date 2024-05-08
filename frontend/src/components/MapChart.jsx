import { useContext } from 'react';
import { StateSelectContext } from '../store/stateSelect-context';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  ZoomableGroup,
} from 'react-simple-maps';

import markers from '../markers';

const geoUrl = '/states.json';

function MapChart() {
  console.log('<MapChart>');

  const selectedStatesCtx = useContext(StateSelectContext);

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
              {selectedStatesCtx.startState == state ||
              selectedStatesCtx.endState == state ? (
                <circle r={7} fill="#E42A1D" stroke="#000" strokeWidth={1} />
              ) : (
                <circle r={7} fill="#8a8a8a" stroke="#000" strokeWidth={1} />
              )}

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
