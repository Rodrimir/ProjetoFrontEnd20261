import React, { createContext, useContext, useState, useEffect } from 'react';
import { getAuthToken, setAuthToken, clearAuthToken } from '../utils/storage';
import { login as apiLogin, register as apiRegister } from '../services/api';
const AuthContext = createContext();
export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const storedToken = getAuthToken();
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);
  const login = async (data) => {
    const response = await apiLogin(data);
    const newToken = response.data.token; 
    setToken(newToken);
    setAuthToken(newToken);
  };
  const register = async (data) => {
    const response = await apiRegister(data);
    if (response.data && response.data.token) {
      setToken(response.data.token);
      setAuthToken(response.data.token);
    }
  };
  const logout = () => {
    setToken(null);
    clearAuthToken();
  };
  return (
    <AuthContext.Provider value={{ token, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
export const useAuth = () => useContext(AuthContext);
