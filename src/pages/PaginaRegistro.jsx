import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './PaginaLogin.css';

export const PaginaRegistro = () => {
  const navegar = useNavigate();
  const [emailInformado, setEmailInformado] = useState('');
  const [senhaInformada, setSenhaInformada] = useState('');

  const criarConta = (evento) => {
    evento.preventDefault();
    alert('Conta criada com sucesso!');
    navegar('/login');
  };

  return (
    <div className="container-login">
      <div className="cartao-login">
        <div className="cabecalho-login">
          <h1>Criar Conta</h1>
          <p>Preencha os dados para se registrar</p>
        </div>
        <form className="area-conteudo" onSubmit={criarConta}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={emailInformado}
            onChange={(e) => setEmailInformado(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--cor-borda)', backgroundColor: 'var(--fundo-entrada)', color: 'var(--texto-primario)' }}
            required
          />
          <input 
            type="password" 
            placeholder="Senha" 
            value={senhaInformada}
            onChange={(e) => setSenhaInformada(e.target.value)}
            style={{ width: '100%', padding: '14px', borderRadius: '8px', border: '1px solid var(--cor-borda)', backgroundColor: 'var(--fundo-entrada)', color: 'var(--texto-primario)' }}
            required
          />
          <button type="submit" className="botao-google-personalizado" style={{ backgroundColor: 'var(--cor-primaria)', color: '#fff', border: 'none' }}>
            Cadastrar
          </button>
        </form>
        <div className="rodape-login">
          <p className="termos-login">Já tem uma conta? <Link to="/login">Faça Login</Link></p>
        </div>
      </div>
    </div>
  );
};