import React, { createContext, useState } from 'react';

export const LadyTaxiContext = createContext();

export const LadyTaxiProvider = ({ children }) => {
  const [isLadyTaxi, setIsLadyTaxi] = useState(false);

  return (
    <LadyTaxiContext.Provider value={{ isLadyTaxi, setIsLadyTaxi }}>
      {children}
    </LadyTaxiContext.Provider>
  );
};