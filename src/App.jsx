import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaCalc as PaginaCalc } from './pages/PaginaCalc.jsx';
import { PaginaLogin } from './pages/PaginaLogin.jsx'; 
import { PaginaTodo } from './pages/PaginaTodo.jsx';
import React from 'react';
import './App.css';
function App() {
  //console.log(State.countRender, 'render'),
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<PaginaLogin />} />
                <Route path="/calc" element={<PaginaCalc />} />
        <Route path="/todo" element={<PaginaTodo />} />
        <Route path="/" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;