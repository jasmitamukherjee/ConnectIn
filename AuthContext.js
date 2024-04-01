import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);

  const updateUserType = (type) => {
    setUserType(type);
  };

  return (
    <AuthContext.Provider value={{ userType, updateUserType }}>
      {children}
    </AuthContext.Provider>
  );
};
