import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaLogin } from './pages/PaginaLogin.jsx'; 
import React from 'react';
import './App.css';
function App() {
  //console.log(State.countRender, 'render'),
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