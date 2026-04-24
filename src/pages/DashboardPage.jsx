import React, { useState, useEffect } from 'react';
import { FaChartBar, FaSignOutAlt, FaPlus, FaInbox } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import './DashboardPage.css';

export const PaginaRotina = () => {
  const navegar = useNavigate();
  const [rotinas, setRotinas] = useState([]);

  useEffect(() => {
    const logado = localStorage.getItem('usuario_logado');
    if (!logado) {
      navegar('/login');
    }
  }, [navegar]);

  const handleLogout = () => {
    localStorage.removeItem('usuario_logado'); 
    navegar('/login');
  };

  const handleNovaRotina = () => {
    const nova = { id: Date.now(), nome: 'Nova Tarefa' };
    setRotinas([...rotinas, nova]);
  };

  return (
    <div className="container-pagina-rotina">
      <header className="cabecalho-rotina">
        <div className="conteudo-cabecalho">
          <h1>TEMPO CLARO</h1>
          
          <div className="acoes-cabecalho">
            <button className="botao-painel" onClick={() => navegar('/painel')}>
              <FaChartBar /> Dashboard
            </button>

            <div className="info-usuario">
              <div className="detalhes-usuario">
                <span className="nome-usuario">Meu Perfil</span>
                <button onClick={handleLogout} className="botao-sair">
                  <FaSignOutAlt /> Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="principal-rotina">
        <div className="secao-rotinas">
          
          <div className="barra-topo">
            <button className="botao-nova-rotina" onClick={handleNovaRotina}>
              <FaPlus /> Nova Rotina
            </button>
          </div>

          <div className="lista-rotinas">
            {rotinas.length === 0 ? (
              <div className="estado-vazio">
                <div className="icone-vazio">
                  <FaInbox />
                </div>
                <h3>Nenhuma rotina encontrada</h3>
                <p>O seu dashboard está pronto para receber novas rotinas.</p>
              </div>
            ) : (
              <ul>
                {rotinas.map(r => <li key={r.id}>{r.nome}</li>)}
              </ul>
            )}
          </div>

        </div>
      </main>
    </div>
  );
};