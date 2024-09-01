import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false)

  return (
    <UserContext.Provider value={{ user, setUser, setChange, change}}>
      {children}
    </UserContext.Provider>
  );
};
