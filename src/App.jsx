import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaCalc as PaginaCalc } from './components/pages/PaginaCalc.jsx';
import { PaginaLogin } from './components/pages/PaginaLogin.jsx'; 
import React from 'react';
import './App.css';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />
                <Route path="/calc" element={<PaginaCalc />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;