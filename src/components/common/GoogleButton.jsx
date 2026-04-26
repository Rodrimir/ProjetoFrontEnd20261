import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../Contexts/AuthContext.jsx';

export const BotaoLoginGoogle = () => {
  const navegar = useNavigate(); 
  const { login } = useAuth();

  const fazerLogin = () => {
    login();
    navegar('/todo');
  };

  return (
    <div className="wrapper-botao-google">
      <button onClick={fazerLogin} className="botao-google-personalizado">
        <img 
          src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
          alt="Google logo" 
          className="icone-google"
        />
        <span>Entrar com Google e Permitir Agenda</span>
      </button>
    </div>
  );
};