import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaMoon, FaSun, FaCalendarAlt, FaSignOutAlt, FaBook, FaBolt, FaCheckCircle, FaClock } from 'react-icons/fa';
import './PainelPage.css';

const gerarEstatisticasIniciais = () => {
  const rotinasMock = [
    {
      id: 1,
      tarefas: [
        { horaInicio: '08:00', horaFim: '09:30' },
        { horaInicio: '10:00', horaFim: '11:00' }
      ]
    },
    {
      id: 2,
      tarefas: [
        { horaInicio: '14:00', horaFim: '15:15' },
        { horaInicio: '16:00', horaFim: '17:30' }
      ]
    }
  ];

  let totalTarefas = 0;
  let duracaoTotalMinutos = 0;

  rotinasMock.forEach(rotina => {
    totalTarefas += rotina.tarefas?.length || 0;
    rotina.tarefas?.forEach(tarefa => {
      const [hI, mI] = tarefa.horaInicio.split(':').map(Number);
      const [hF, mF] = tarefa.horaFim.split(':').map(Number);
      duracaoTotalMinutos += (hF * 60 + mF) - (hI * 60 + mI);
    });
  });

  const horas = Math.floor(duracaoTotalMinutos / 60);
  const minutos = duracaoTotalMinutos % 60;

  return {
    contagemRotinas: rotinasMock.length,
    rotinasAtivas: rotinasMock.length,
    totalTarefas,
    duracaoTotal: horas === 0 ? `${minutos}min` : `${horas}h ${minutos}min`
  };
};

export const PaginaPainel = () => {
  const navegar = useNavigate();
  const [temaEscuro, setTemaEscuro] = useState(false);
  const [estatisticas] = useState(gerarEstatisticasIniciais);

  const usuario = {
    nome: "Usuário",
    foto: null
  };

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

  const alternarTemaLocal = () => setTemaEscuro(!temaEscuro);

  return (
    <div className={`container-painel ${temaEscuro ? 'dark-theme' : 'light-theme'}`}>
      <header className="cabecalho-painel">
        <div className="conteudo-cabecalho">
          <h1>TEMPO CLARO</h1>

          <div className="acoes-cabecalho">
            <button className="botao-tema" onClick={alternarTemaLocal}>
              {temaEscuro ? <FaSun size={18} /> : <FaMoon size={18} />}
            </button>

            <button className="botao-nav" onClick={() => navegar('/dashboard')}>
              <FaCalendarAlt /> Rotinas
            </button>

            <div className="info-usuario">
              <div className="detalhes-usuario">
                <p className="nome-usuario">{usuario.nome}</p>
                <button onClick={handleLogout} className="botao-sair">
                  <FaSignOutAlt /> Sair
                </button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="principal-painel">
        <div className="grade-estatisticas">
          <div className="cartao-estatistica">
            <h3>Total de Rotinas</h3>
            <div className="valor-estatistica">{estatisticas.contagemRotinas}</div>
            <p><FaBook /> Cadastradas</p>
          </div>

          <div className="cartao-estatistica">
            <h3>Em Atividade</h3>
            <div className="valor-estatistica">{estatisticas.rotinasAtivas}</div>
            <p><FaBolt /> Hoje</p>
          </div>

          <div className="cartao-estatistica">
            <h3>Tarefas Diárias</h3>
            <div className="valor-estatistica">{estatisticas.totalTarefas}</div>
            <p><FaCheckCircle /> Programadas</p>
          </div>

          <div className="cartao-estatistica">
            <h3>Tempo Alocado</h3>
            <div className="valor-estatistica">{estatisticas.duracaoTotal}</div>
            <p><FaClock /> Duração Total</p>
          </div>
        </div>
      </main>
    </div>
  );
};