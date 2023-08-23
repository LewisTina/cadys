import { createContext, useState } from "react";

export const DataContext = createContext<any>(undefined);

export const GlobalUserDataProvider: React.FC<{}> = ({ children }) => {
    const [data, setData] = useState(undefined);
  
    return <DataContext.Provider value={{data, setData}}>
      {children}
    </DataContext.Provider>
  }