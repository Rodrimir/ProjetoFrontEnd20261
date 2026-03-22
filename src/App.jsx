import React from 'react';
import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaLogin } from './pages/PaginaLogin'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;