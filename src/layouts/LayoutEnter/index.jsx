import React from 'react';
import { Outlet } from 'react-router-dom';
import './styles.css';

export const LayoutEnter = () => {
  return (
    <div className="container-login">
      <Outlet />
    </div>
  );
};
