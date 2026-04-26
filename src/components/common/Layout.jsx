import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext.jsx';

export const Layout = () => {
  const { logout } = useAuth();
  const navegar = useNavigate();

  const sairDoSistema = () => {
    logout();
    navegar('/login');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <nav style={{ padding: '20px 40px', backgroundColor: '#1f2937', display: 'flex', gap: '25px', alignItems: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.3)' }}>
        <Link to="/todo" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>TodoList</Link>
        <Link to="/calc" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold', fontSize: '1.1rem' }}>Calculadora IMC</Link>
        <div style={{ flex: 1 }}></div>
        <button onClick={sairDoSistema} style={{ backgroundColor: '#ef4444' }}>Sair</button>
      </nav>
      
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
    </div>
  );
};