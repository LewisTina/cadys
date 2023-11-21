import { createContext, useContext, useState } from "react";

export const DataContext = createContext<any>(undefined);

export const GlobalUserDataProvider: React.FC<any> = ({ children }) => {
    const [data, setData] = useState(undefined);
  
    return <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  }
  
export const useDataContext = () => useContext(DataContext);