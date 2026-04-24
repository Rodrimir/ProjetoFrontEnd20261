<<<<<<< Updated upstream
=======
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { LayoutEnter } from './layout/LayoutEnter.jsx'; 
import { CardLogin } from './pages/CardLogin.jsx';
import { CardCadastro } from './pages/CardCadastro.jsx';
import { PaginaPainel } from './pages/PainelPage.jsx';
import { PaginaRotina } from './pages/DashboardPage.jsx';
>>>>>>> Stashed changes
import React from 'react';
import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaLogin } from './pages/PaginaLogin'; 
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LayoutEnter />}>
          <Route index element={<Navigate to="/login" replace />} />
          <Route path="login" element={<CardLogin />} />
          <Route path="cadastro" element={<CardCadastro />} />
        </Route>
        
        <Route path="/painel" element={<PaginaPainel />} />
        <Route path="/dashboard" element={<PaginaRotina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;