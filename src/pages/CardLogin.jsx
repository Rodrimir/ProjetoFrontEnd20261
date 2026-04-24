import { CarregadorSpinner } from '../components/common/LoadSpinner';  
import { BotaoLoginGoogle } from '../components/common/GoogleButton'; 
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './EnterComponents.css';

export const CardLogin = () => {
  const [carregando] = useState(false);
  const navegar = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    localStorage.setItem('usuario_logado', 'true');
    navegar('/painel');
  };

  if (carregando) {
    return <CarregadorSpinner />;
  }

  return (
    <div className="cartao-login">
      <div className="cabecalho-login">
        <h1>TEMPO CLARO</h1>
        <p>Bem-vindo ao nosso aplicativo</p>
      </div>

      <div className="area-conteudo">
        <p className="descricao-login">
          Faça login para acessar suas rotinas e calendário.
        </p>
        
        <form onSubmit={handleLogin} className="formulario">
          <input type="email" placeholder="E-mail" required className="inputs"/>
          <input type="password" placeholder="Senha" required className="inputs"/>
          <button type="submit" className="botao-google-personalizado">
            <span>Entrar com usuário e senha</span>
          </button>
        </form>

        <div className="divisor">
          ou
        </div>
        
        <BotaoLoginGoogle />
        
        <div className="cadastro">
          <p>Ainda não tem uma conta? <Link to="/cadastro">Cadastre-se</Link></p>
        </div>
      </div>

      <div className="rodape-login">
        <p className="termos-login">
          Ao fazer login, você concorda com nossos{' '}
          <a href="/termos">Termos de Serviço</a> e{' '}
          <a href="/privacidade">Política de Privacidade</a>.
        </p>
      </div>
    </div>
  );
};