import { useRef, useState } from 'react';

import DropDown from './DropDown';

import { fetchShortestPath } from '../http';

import markers from '../markers';
const sortedStates = Object.keys(markers).sort();

export default function Select() {
  console.log('<Select/>');
  const startStateRef = useRef();
  const endStateRef = useRef();

  const [errorFetching, setErrorFetching] = useState({ message: undefined });
  const [fetchedData, setFetchedData] = useState('');

  async function handleSubmit() {
    const startAirport = startStateRef.current.value;
    const endAirport = endStateRef.current.value;

    if (startAirport === 'none' || endAirport === 'none') {
      console.log('Please select a location');
      return;
    }

    if (startAirport === endAirport) {
      console.log('Start and end state must be different!');
      return;
    }

    try {
      const resData = await fetchShortestPath(startAirport, endAirport);
      const message = resData['shortest path'];
      setFetchedData(message);
    } catch (error) {
      setErrorFetching({
        message: error.message,
      });
    }
  }

  return (
    <>
      <section className="flex justify-end gap-1">
        <DropDown
          label="Select starting state"
          markers={markers}
          sortedStates={sortedStates}
          ref={startStateRef}
        />
        <DropDown
          label="Select end state"
          markers={markers}
          sortedStates={sortedStates}
          ref={endStateRef}
        />
        <button
          type="button"
          onClick={handleSubmit}
          className="rounded-md bg-green-700 px-2 py-1 text-center font-medium hover:bg-green-600"
        >
          Go
        </button>
      </section>
      {fetchedData && (
        <h3 className="mt-4 text-center font-bold md:text-2xl">
          {fetchedData}
        </h3>
      )}
      {errorFetching.message && (
        <h3 className="mt-2 text-center font-bold text-red-400">
          {errorFetching.message}
        </h3>
      )}
    </>
  );
}
