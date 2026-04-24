import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream:src/components/GoogleButton.jsx

export const BotaoLoginGoogle = () => {
  const navegar = useNavigate();

  return (
    <div className="wrapper-botao-google">
      <button 
        onClick={() => navegar('/painel')}
=======
import React from 'react';
export const BotaoLoginGoogle = () => { const navegar = useNavigate(); const handleLoginGoogle = () => {navegar('/dashboard'); 
  };
  return (
    <div className="wrapper-botao-google">
      <button 
        onClick={handleLoginGoogle} 
>>>>>>> Stashed changes:src/components/common/GoogleButton.jsx
        className="botao-google-personalizado"
      >
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