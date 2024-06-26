import { useState } from 'react';

import DropDown from './DropDown';
import Modal from './Modal/Modal';
import SubmitError from './Modal/SubmitError';

import { fetchShortestPath } from '../http';

export default function Select() {
  console.log('<Select />');

  const [fetchedData, setFetchedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState({
    open: false,
    message: '',
  });

  function closeModal() {
    setIsModalOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const fd = new FormData(event.target);
    const data = Object.fromEntries(fd.entries());

    const startAirport = data.startState;
    const endAirport = data.endState;

    // If start or end location is not selected
    if (startAirport === 'none' || endAirport === 'none') {
      setIsModalOpen((prevModal) => ({
        ...prevModal,
        open: true,
        message: 'Please select a state/captial for both starting and end.',
      }));
      return;
    }

    // If both the start and end are the same
    if (startAirport === endAirport) {
      setIsModalOpen((prevModal) => ({
        ...prevModal,
        open: true,
        message: 'Start and end state/capital must be different.',
      }));
      return;
    }

    // Make GET request
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
      {isModalOpen.open && (
        <Modal open={isModalOpen.open} onClose={closeModal}>
          <SubmitError message={isModalOpen.message} onClick={closeModal} />
        </Modal>
      )}

      <form onSubmit={handleSubmit} className="flex justify-end gap-2">
        <DropDown name="startState" label="Select start state" />
        <p className="text-2xl font-bold">→</p>
        <DropDown name="endState" label="Select end state" />
        <button
          type="submit"
          className="rounded-md bg-green-700 px-2 py-1 text-center font-medium hover:bg-green-600"
        >
          Go
        </button>
      </form>

      {fetchedData && (
        <p className="mt-4 text-center font-bold md:text-2xl">{fetchedData}</p>
      )}
    </>
  );
}
