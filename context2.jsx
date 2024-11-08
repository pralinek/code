import React, { createContext, useReducer, useContext } from 'react';

// Action Type
const SET_USER = 'SET_USER';

// Initial State
const initialState = {
  name: '',
  email: '',
  age: null,
};

// Reducer function to replace the whole state with the payload
function userReducer(state, action) {
  switch (action.type) {
    case SET_USER:
      return action.payload; // Set entire state to the payload object
    default:
      return state;
  }
}

// Create the context
const UserContext = createContext();

// Provider component
export function UserProvider({ children }) {
  const [state, dispatch] = useReducer(userReducer, initialState);

  // Action to set the entire user object
  const setUser = (user) => dispatch({ type: SET_USER, payload: user });

  return (
    <UserContext.Provider value={{ state, setUser }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook to use the UserContext
export function useUser() {
  return useContext(UserContext);
}


import React from 'react';
import { UserProvider, useUser } from './UserContext';

function UserProfile() {
  const { state, setUser } = useUser();
  
  const updateUser = () => {
    setUser({
      name: 'John Doe',
      email: 'john@example.com',
      age: 30
    });
  };

  return (
    <div>
      <h1>User Profile</h1>
      <p>Name: {state.name}</p>
      <p>Email: {state.email}</p>
      <p>Age: {state.age}</p>
      <button onClick={updateUser}>Update User</button>
    </div>
  );
}

function App() {
  return (
    <UserProvider>
      <UserProfile />
    </UserProvider>
  );
}

export default App;

