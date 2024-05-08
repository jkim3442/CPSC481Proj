import { useContext } from 'react';
import { StateSelectContext } from '../store/stateSelect-context';

export default function DropDown({ name, label }) {
  console.log('- <DropDown />');

  const selectedStatesCtx = useContext(StateSelectContext);

  function handleChange(event) {
    const selectedOption = event.target.selectedOptions[0];
    const state = selectedOption.getAttribute('data-name');
    if (name === 'startState') selectedStatesCtx.updateSelected(state, '');
    else selectedStatesCtx.updateSelected('', state);
  }

  return (
    <select
      name={name}
      defaultValue="none"
      className="rounded-md bg-blue-700 px-2 py-1 text-center font-medium shadow-lg hover:bg-blue-600"
      onChange={handleChange}
    >
      <option value="none">{label}</option>
      {selectedStatesCtx.states.map((state) => {
        const { name, capital, airport } = state;

        return (
          <option value={airport} data-name={name} key={name}>
            {name} - {capital}
          </option>
        );
      })}
    </select>
  );
}
