import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTodo } from '../Contexts/TodoContext.jsx';

export const PaginaTodoDetalhe = () => {
  const { id } = useParams();
  const navegar = useNavigate();
  const { listTodos } = useTodo();

  const tarefaVisualizada = listTodos.find(item => item.id === Number(id));

  return (
    <div className="container-todo-page" style={{ margin: '50px auto' }}>
      <button onClick={() => navegar('/todo')} style={{ alignSelf: 'flex-start', marginBottom: '20px' }}>Voltar</button>
      
      {tarefaVisualizada ? (
        <div className="todo-card">
          <h2 style={{ color: 'var(--cor-primaria)' }}>{tarefaVisualizada.titulo}</h2>
          <p>Visão detalhada dos passos:</p>
          <ul className="lista-passos">
            {tarefaVisualizada.passos.map(passo => (
              <li key={passo.id} className={passo.done ? 'passo-feito' : ''}>
                <span>{passo.done ? '✓' : '○'} {passo.texto}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <h2 style={{ textAlign: 'center', marginTop: '20px' }}>Tarefa não encontrada</h2>
      )}
    </div>
  );
};