import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useTodo } from '../../Contexts/TodoContext.jsx';
import './Todo.css';

export const Todo = ({ todo }) => {
  const [textoPasso, setTextoPasso] = useState('');
  const { addPasso, togglePasso, delPasso, delTodo } = useTodo();
  const navegar = useNavigate();

  const handleAddPasso = () => {
    if (textoPasso.trim() === '') return;
    addPasso(todo.id, textoPasso);
    setTextoPasso('');
  };

  const todosPassosConcluidos = todo.passos.length > 0 && todo.passos.every(p => p.done);

  return (
    <div className={`todo-card ${todosPassosConcluidos ? 'todo-concluido' : ''}`}>
      <div className="todo-header">
        <h3>{todo.titulo}</h3>
        <button onClick={() => navegar(`/todo/${todo.id}`)} style={{ padding: '8px 12px', fontSize: '0.8rem', backgroundColor: 'var(--cor-primaria)' }}>Ver</button>
        <button onClick={() => delTodo(todo.id)} className="btn-del-todo">Excluir</button>
      </div>

      <div className="add-passo">
        <input 
          type="text" 
          value={textoPasso} 
          onChange={(e) => setTextoPasso(e.target.value)}
          placeholder="Adicionar um passo..."
        />
        <button onClick={handleAddPasso}>+ Passo</button>
      </div>

      <ul className="lista-passos">
        {todo.passos.map(passo => (
          <li key={passo.id} className={passo.done ? 'passo-feito' : ''}>
            <span onClick={() => togglePasso(todo.id, passo.id)}>
              {passo.done ? '✓' : '○'} {passo.texto}
            </span>
            <button onClick={() => delPasso(todo.id, passo.id)} title="Excluir passo">✕</button>
          </li>
        ))}
      </ul>
    </div>
  );
};