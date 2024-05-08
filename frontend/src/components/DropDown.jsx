import { useContext } from 'react';
import { StateSelectContext } from '../store/stateSelect-context';
import { getStateCodeByStateName } from 'us-state-codes';

export default function DropDown({ name, markers, sortedStates }) {
  console.log('- <DropDown />');

  const selectedStatesCtx = useContext(StateSelectContext);

  // Organize options in alphabetical order
  const options = sortedStates.map((key) => (
    <option value={key} key={key}>
      {getStateCodeByStateName(key)} - {markers[key].capital}
    </option>
  ));

  // Change startState/endState
  function handleChange(event) {
    const state = event.target.value;
    if (name === 'startState') selectedStatesCtx.updateSelected(state, '');
    else selectedStatesCtx.updateSelected('', state);
  }

  // Control the lable text
  let label;
  if (name === 'startState') label = 'Select starting state';
  else label = 'Select end state';

  return (
    <select
      name={name}
      defaultValue="none"
      className="rounded-md bg-blue-700 px-2 py-1 text-center font-medium shadow-lg hover:bg-blue-600"
      onChange={handleChange}
    >
      <option value="none">{label}</option>
      {options}
    </select>
  );
}
