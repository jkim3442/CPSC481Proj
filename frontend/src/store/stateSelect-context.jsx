import { createContext, useReducer } from 'react';

export const StateSelectContext = createContext({
  startState: 'none',
  endState: 'none',
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

  return state;
}

export default function stateContextProvider({ children }) {
  const [selectedStatesState, selectedStatesDispatch] = useReducer(
    selectedStatesReducer,
    {
      startState: '',
      endState: '',
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
    updateSelected: handleUpdate,
  };

  return (
    <StateSelectContext.Provider value={ctxValue}>
      {children}
    </StateSelectContext.Provider>
  );
}
