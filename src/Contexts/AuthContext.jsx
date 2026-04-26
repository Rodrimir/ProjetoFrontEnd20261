import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [autenticado, setAutenticado] = useState(() => {
    return localStorage.getItem('usuario_autenticado') === 'true';
  });

  const login = () => {
    localStorage.setItem('usuario_autenticado', 'true');
    setAutenticado(true);
  };

  const logout = () => {
    localStorage.removeItem('usuario_autenticado');
    setAutenticado(false);
  };

  return (
    <AuthContext.Provider value={{ autenticado, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};