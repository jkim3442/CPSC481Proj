import { useContext } from 'react';
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from 'react-simple-maps';

import { StateSelectContext } from '../store/stateSelect-context';

import geoJSON from '../assets/states.json';

function MapChart() {
  console.log('<MapChart>');

  const selectedStatesCtx = useContext(StateSelectContext);

  return (
    <ComposableMap projection="geoAlbersUsa">
      {/* Render states */}
      <Geographies geography={geoJSON}>
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#cbfcae"
                stroke="#000000"
                strokeWidth={0.25}
              />
            );
          })
        }
      </Geographies>

      {/* Render markers */}
      {selectedStatesCtx.states.map((state) => {
        const { name, latitude, longitude } = state;
        const coords = [longitude, latitude];

        let circleColor = '#8a8a8a';
        let circleSize = 5;
        let textColor = '#5D5A6D';

        if (
          selectedStatesCtx.startState === name ||
          selectedStatesCtx.endState === name
        ) {
          circleColor = '#E42A1D';
          circleSize = 7;
          textColor = '#fa673e';
        }

        return (
          <Marker key={name} coordinates={coords}>
            <circle
              r={circleSize}
              fill={circleColor}
              stroke="#000"
              strokeWidth={1}
            />
            {/* <text textAnchor="middle" y={-10} style={{ fill: textColor }}>
              {state.capital}
            </text> */}
          </Marker>
        );
      })}
    </ComposableMap>
  );
}

export default MapChart;
