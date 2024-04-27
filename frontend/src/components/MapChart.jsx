import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json';

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

function handleClick(geo) {
  console.log(geo);
}

const MapChart = () => {
  return (
    <ComposableMap projection="geoAlbersUsa">
      <Geographies geography={geoUrl}>
        {/* {({ geographies, outline, borders }) => (
          <>
            <Geography geography={outline} fill="#E9E3DA" stroke="#000" />
            <Geography geography={borders} fill="none" stroke="#000" />
          </>
        )} */}
        {({ geographies }) =>
          geographies.map((geo) => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#FF5533"
                stroke="#000000"
                onClick={() => handleClick(geo)}
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
    </ComposableMap>
  );
};

export default MapChart;
