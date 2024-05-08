import { createContext, useReducer } from 'react';
import { capitals_coordinates } from '../coords';

export const StateSelectContext = createContext({
  startState: 'none',
  endState: 'none',
  states: capitals_coordinates,
  updateSelected: () => {},
});

function selectedStatesReducer(state, action) {
  if (action.type === 'UPDATE') {
    const newState = { ...state };

    if (action.payload.startState) {
      newState.startState = action.payload.startState;
    }

    if (action.payload.endState) {
      newState.endState = action.payload.endState;
    }

    return newState;
  }

  if (action.type === 'INITIALIZE') {
    const newState = { ...state };
    newState.states = action.payload.markers;

    return newState;
  }

  return state;
}

export default function stateContextProvider({ children }) {
  const [selectedStatesState, selectedStatesDispatch] = useReducer(
    selectedStatesReducer,
    {
      startState: 'none',
      endState: 'none',
      states: capitals_coordinates,
    },
  );

  function handleUpdate(start, end) {
    selectedStatesDispatch({
      type: 'UPDATE',
      payload: {
        startState: start,
        endState: end,
      },
    });
  }

  const ctxValue = {
    startState: selectedStatesState.startState,
    endState: selectedStatesState.endState,
    states: selectedStatesState.states,
    updateSelected: handleUpdate,
  };

  return (
    <StateSelectContext.Provider value={ctxValue}>
      {children}
    </StateSelectContext.Provider>
  );
}
