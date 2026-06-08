import { useNavigate } from 'react-router-dom';

export const BotaoLoginGoogle = () => {
  const navegar = useNavigate();

  const handleLoginGoogle = () => {
    navegar('/painel');
  };

  return (
    <div className="wrapper-botao-google">
      <button 
        onClick={handleLoginGoogle}
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
