import React, { createContext, useState, useEffect, useContext, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import userApi from '../api/userApi';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  useEffect(() => {const checkAuth = async () => {
    try {
      const token = await AsyncStorage.getItem('@AccessToken');
      console.log(token);
      if (token != null) {
        const decodedToken = await userApi.ObtenerInfoJugador(token);
        const currentTime = Date.now() / 1000;
        if (decodedToken.exp < currentTime) {
          await AsyncStorage.removeItem('@AccessToken');
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Error checking authentication:', error);
      setIsAuthenticated(false);
    }
  };checkAuth();
},[]);
 

  
  const login = async (newToken) => {
    try {
      await AsyncStorage.setItem('@AccessToken', newToken);
      setIsAuthenticated(true);
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem('@AccessToken');
      await AsyncStorage.removeItem('@GrupoId');
      setIsAuthenticated(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}