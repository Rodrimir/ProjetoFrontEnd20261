import { CarregadorSpinner } from '../components/common/LoadSpinner';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './EnterComponents.css';

export const CardCadastro = () => {
  const [carregando] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  if (carregando) {
    return <CarregadorSpinner />;
  }

  return (
    <div className="cartao-login">
      <div className="cabecalho-login">
        <h1>TEMPO CLARO</h1>
        <h2>Crie sua conta</h2>
      </div>

      <div className="area-conteudo">
        <form onSubmit={handleSubmit} className="formulario">
          <input type="text" placeholder="Nome completo" required className="inputs"/>
          <input type="email" placeholder="E-mail" required className="inputs"/>
          <input type="password" placeholder="Senha" required className="inputs"/>
          <button type="submit" className="botao-google-personalizado">
            Criar Conta
          </button>
        </form>

        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <p>Já possui uma conta? <Link to="/login">Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
};