import React, { useState } from 'react';
import { BotaoLoginGoogle } from '../components/GoogleButton'; 
import { CarregadorSpinner } from '../components/LoadSpinner';  
import './PaginaLogin.css';

export const PaginaLogin = () => {
  const [carregando] = useState(false);

  if (carregando) {
    return <CarregadorSpinner />;
  }

  return (
    <div className="container-login">
      <div className="cartao-login">
        <div className="cabecalho-login">
          <h1>TEMPO-CLARO</h1>
          <p>Bem-vindo ao nosso aplicativo</p>
        </div>

        <div className="area-conteudo">
          <p className="descricao-login">
            Faça login para acessar suas rotinas e calendário.
          </p>
          <div>
            <BotaoLoginGoogle />
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
    </div>
  );
};