import { createContext, useContext, useState } from "react";

export const UserSession = createContext<any>(undefined);

export const UserSessionProvider: React.FC<any> = ({ children }) => {
    const [data, setData] = useState(undefined);

    return <UserSession.Provider value={{data, setData}}>
      {children}
    </UserSession.Provider>
  }

  
export const useUserSession = () => useContext(UserSession);