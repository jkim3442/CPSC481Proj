import { useContext } from 'react';
import { StateSelectContext } from '../store/stateSelect-context';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import markers from '../markers';

const geoUrl = '/states.json';

function MapChart() {
  console.log('<MapChart>');

  const selectedStatesCtx = useContext(StateSelectContext);

  return (
    <ComposableMap projection="geoAlbersUsa">
      {/* Render states */}
      <Geographies geography={geoUrl}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#d9f7d2"
                stroke="#000000"
                strokeWidth={0.25}
              />
            );
          })
        }
      </Geographies>

      {/* Render markers */}
      {Object.entries(markers).map(([state, value]) => {
        let circleColor = '#8a8a8a';
        let textColor = '#5D5A6D';

        if (
          selectedStatesCtx.startState === state ||
          selectedStatesCtx.endState === state
        ) {
          circleColor = '#E42A1D';
          textColor = '#fa673e';
        }

        return (
          <Marker key={state} coordinates={value.coordinates}>
            <circle r={7} fill={circleColor} stroke="#000" strokeWidth={1} />
            <text textAnchor="middle" y={-10} style={{ fill: textColor }}>
              {value.capital}
            </text>
          </Marker>
        );
      })}
    </ComposableMap>
  );
}

export default MapChart;
