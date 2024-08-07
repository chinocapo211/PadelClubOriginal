import React, { createContext, useState, useEffect, useContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const loadToken = async () => {
      const storedToken = await AsyncStorage.getItem('@AccessToken');
      if (storedToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    };
    loadToken();
  }, []);

  const login = async (newToken) => {
    await AsyncStorage.setItem('@AccessToken', newToken);
    setIsAuthenticated(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('@AccessToken');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);