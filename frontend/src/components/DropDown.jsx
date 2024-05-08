import { getStateCodeByStateName } from 'us-state-codes';

export default function DropDown({ name, label, markers, sortedStates }) {
  console.log('- <DropDown />');

  const options = sortedStates.map((key) => (
    <option value={markers[key].airport} key={key}>
      {getStateCodeByStateName(key)} - {markers[key].capital}
    </option>
  ));

  return (
    <select
      name={name}
      defaultValue="none"
      className="rounded-md bg-blue-700 px-2 py-1 text-center font-medium shadow-lg hover:bg-blue-600"
    >
      <option value="none">{label}</option>
      {options}
    </select>
  );
}
