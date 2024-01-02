import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const login = (userData) => {
    setUser(userData);
  };
  const logout = () => {
    localStorage.removeItem("user_info");
    localStorage.removeItem("access_token");
    setUser(null)
  };
    
  return (
    <UserContext.Provider value={{ user, login ,logout}}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to access the context
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
