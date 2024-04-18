import { createContext, useContext, useState } from "react";

export const SelectedCountryContext = createContext();

export const SelectedCountryProvider = ({ children }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);

  return (
    <SelectedCountryContext.Provider value={{ selectedCountry, setSelectedCountry }}>
      {children}
    </SelectedCountryContext.Provider>
  );
};

export const useSelectedCountry = () => useContext(SelectedCountryContext);
