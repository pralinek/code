import React, { createContext, useReducer, useContext } from 'react';

// 1. Define actions
const INCREMENT = 'INCREMENT';
const DECREMENT = 'DECREMENT';

// 2. Create the initial state
const initialState = {
  count: 0,
};

// 3. Define the reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// 4. Create the context
const CounterContext = createContext();

// 5. Create a provider component
export function CounterProvider({ children }) {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  // Optional: Wrap dispatch actions in custom functions for easier use
  const increment = () => dispatch({ type: INCREMENT });
  const decrement = () => dispatch({ type: DECREMENT });

  return (
    <CounterContext.Provider value={{ state, increment, decrement }}>
      {children}
    </CounterContext.Provider>
  );
}

// 6. Custom hook for consuming the context
export function useCounter() {
  return useContext(CounterContext);
}



import React from 'react';
import { CounterProvider, useCounter } from './CounterContext';

function CounterDisplay() {
  const { state, increment, decrement } = useCounter();
  
  return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

import React from 'react';
import { CounterProvider, useCounter } from './CounterContext';

function CounterDisplay() {
  const { state, increment, decrement } = useCounter();
  
  return (
    <div>
      <h1>Counter: {state.count}</h1>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

function App() {
  return (
    <CounterProvider>
      <CounterDisplay />
    </CounterProvider>
  );
}

export default App;
