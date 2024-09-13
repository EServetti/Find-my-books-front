import React, { createContext, useState } from 'react';
import useUserData from '../hooks/useUserData';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [change, setChange] = useState(false)
  const [loading, setLoading ] = useState(true)

  return (
    <UserContext.Provider value={{ user, setUser, setChange, change, loading}}>
      {children}
    </UserContext.Provider>
  );
};
