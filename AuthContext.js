import React, { createContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [userType, setUserType] = useState(null);
const [token,setToken] =useState("")
const [isLoading,setIsLoading] = useState(false)
const isLoggedIn = async () => {
  try {
    setIsLoading(true);
    const userToken = await AsyncStorage.getItem('token');
    setToken(userToken);
    setIsLoading(false);
  } catch (error) {
    console.log('error', error);
  }
};
  const updateUserType = (type) => {
    setUserType(type);
  };
  useEffect(() => {
    isLoggedIn()
},[token]);
// useEffect(() => {
//   // Check if token is set and trigger navigation accordingly
//   if (token) {
//     // Perform navigation or any other action
//     console.log('Token set, performing navigation...');
//   }
// }, [token]);
  return (
    <AuthContext.Provider value={{ userType, updateUserType,token,isLoading,setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
