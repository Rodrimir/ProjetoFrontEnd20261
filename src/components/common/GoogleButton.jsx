import React from 'react';
import { useNavigate } from 'react-router-dom';

export const BotaoLoginGoogle = () => { const navegar = useNavigate(); 
  return (
    <div className="wrapper-botao-google">
      <button onClick={() => navegar('/calc')}className="botao-google-personalizado">
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