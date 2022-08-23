import { useContext, createContext } from "react";

const LocationContext = createContext<{ initialPathName: string }>({ initialPathName: window.location.pathname });

interface LocationProviderI {
  children: React.ReactNode;
}

export const useGetLocation = () => useContext(LocationContext);

const LocationProvider = (props: LocationProviderI) => {
  return (
    <LocationContext.Provider value={{ initialPathName: window.location.pathname }}>
      {props.children}
    </LocationContext.Provider>
  );
};

export default LocationProvider;
