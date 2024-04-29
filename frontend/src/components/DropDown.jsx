import { forwardRef } from 'react';
import { getStateCodeByStateName } from 'us-state-codes';

const DropDown = forwardRef(function DropDown(
  { label, markers, sortedStates },
  ref,
) {
  console.log('- <DropDown />');

  const options = sortedStates.map((key) => (
    <option value={markers[key].airport} key={key}>
      {getStateCodeByStateName(key)} - {markers[key].capital}
    </option>
  ));

  return (
    <select
      name="state"
      defaultValue="none"
      className="rounded-md bg-blue-700 px-2 py-1 text-center font-medium shadow-lg hover:bg-blue-600"
      ref={ref}
    >
      <option value="none">{label}</option>
      {options}
    </select>
  );
});

export default DropDown;
