import { createContext, useState } from "react";

export const UserSession = createContext<any>(undefined);

export const UserSessionProvider: React.FC<{}> = ({ children }) => {
    const [data, setData] = useState(undefined);
  
    return <UserSession.Provider value={{data, setData}}>
      {children}
    </UserSession.Provider>
  }