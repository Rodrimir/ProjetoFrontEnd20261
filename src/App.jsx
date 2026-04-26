import { BrowserRouter , Routes , Route, Navigate  } from 'react-router-dom';
import { PaginaCalc } from './pages/PaginaCalc.jsx';
import { PaginaLogin } from './pages/PaginaLogin.jsx'; 
import { PaginaRegistro } from './pages/PaginaRegistro.jsx';
import { PaginaTodo } from './pages/PaginaTodo.jsx';
import { PaginaTodoDetalhe } from './pages/PaginaTodoDetalhe.jsx';
import { RotaProtegida } from './components/common/RotaProtegida.jsx';
import { Layout } from './components/common/Layout.jsx';
import { AuthProvider } from './Contexts/AuthContext.jsx';
import { TodoProvider } from './Contexts/TodoContext.jsx';
import React from 'react';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <TodoProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/login" element={<PaginaLogin />} />
            <Route path="/registro" element={<PaginaRegistro />} />
            
            <Route element={<RotaProtegida><Layout /></RotaProtegida>}>
              <Route path="/calc" element={<PaginaCalc />} />
              <Route path="/todo" element={<PaginaTodo />} />
              <Route path="/todo/:id" element={<PaginaTodoDetalhe />} />
            </Route>

            <Route path="/" element={<Navigate to="/todo" replace />} />
          </Routes>
        </BrowserRouter>
      </TodoProvider>
    </AuthProvider>
  );
}

export default App;