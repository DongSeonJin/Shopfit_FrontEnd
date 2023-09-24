import React, { createContext, useReducer } from 'react';

export const LoadingContext = createContext();

const initialState = {
  loading: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SHOW':
      return { loading: true };
    case 'HIDE':
      return { loading: false };
    default:
      throw new Error();
  }
}

export const LoadingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <LoadingContext.Provider value={{ state, dispatch }}>
      {children}
    </LoadingContext.Provider>
  );
};