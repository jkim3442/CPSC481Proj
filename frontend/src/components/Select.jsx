import { useRef, useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import DropDown from './DropDown';
import Modal from './Modal';
import SubmitError from './SubmitError';

import { fetchShortestPath } from '../http';

import markers from '../markers';
const sortedStates = Object.keys(markers).sort();

export default function Select() {
  console.log('<Select/>');
  const startStateRef = useRef();
  const endStateRef = useRef();

  const [fetchedData, setFetchedData] = useState('');
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    message: '',
  });

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit() {
    const startAirport = startStateRef.current.value;
    const endAirport = endStateRef.current.value;

    // If start or end location is not selected
    if (startAirport === 'none' || endAirport === 'none') {
      setIsModalOpen((prevModal) => ({
        ...prevModal,
        open: true,
        message: 'Please select a state/captial for both starting and end',
      }));
      return;
    }

    // If both the start and end are the same
    if (startAirport === endAirport) {
      setIsModalOpen((prevModal) => ({
        ...prevModal,
        open: true,
        message: 'Start and end state/capital must be different!',
      }));
      return;
    }

    try {
      const resData = await fetchShortestPath(startAirport, endAirport);
      const message = resData['shortest path'];
      setFetchedData(message);
    } catch (error) {
      setIsModalOpen((prevModal) => ({
        ...prevModal,
        open: true,
        message: error.message,
      }));
    }
  }

  return (
    <>
      <AnimatePresence>
        {isModalOpen.open && (
          <Modal open={isModalOpen.open} onClose={closeModal}>
            <SubmitError message={isModalOpen.message} onClick={closeModal} />
          </Modal>
        )}
      </AnimatePresence>

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
    </>
  );
}
