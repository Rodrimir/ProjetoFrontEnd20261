import React, { useState } from 'react';
import './Todo.css';

export const Todo = ({ todo, onAddPasso, onTogglePasso, onDelPasso, onDelTodo }) => {
  const [textoPasso, setTextoPasso] = useState('');

  const handleAddPasso = () => {
    if (textoPasso.trim() === '') return;
    onAddPasso(todo.id, textoPasso);
    setTextoPasso('');
  };

  // Verifica se a tarefa tem passos E se TODOS eles estão marcados como 'done: true'
  const todosPassosConcluidos = todo.passos.length > 0 && todo.passos.every(p => p.done);

  return (
    // Se todos os passos estiverem concluídos, adiciona a classe "todo-concluido" para mudar o visual
    <div className={`todo-card ${todosPassosConcluidos ? 'todo-concluido' : ''}`}>
      <div className="todo-header">
        <h3>{todo.titulo}</h3>
        <button onClick={() => onDelTodo(todo.id)} className="btn-del-todo">Excluir Tarefa</button>
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
            <span onClick={() => onTogglePasso(todo.id, passo.id)}>
              {passo.done ? '✅ ' : '🔲 '} {passo.texto}
            </span>
            <button onClick={() => onDelPasso(todo.id, passo.id)}>x</button>
          </li>
        ))}
      </ul>
    </div>
  );
};