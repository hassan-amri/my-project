// DataContext.js
import React, { createContext, useState, useContext } from 'react';

// Create context
const DataContext = createContext();

// Context Provider
export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null);

  return (
    <DataContext.Provider value={{ data, setData }}>
      {children}
    </DataContext.Provider>
  );
};

// Custom hook to consume the context
export const useData = () => useContext(DataContext);
