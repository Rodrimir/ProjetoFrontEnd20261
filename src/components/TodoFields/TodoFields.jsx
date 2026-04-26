import React, { useState } from 'react';
import { useTodo } from '../../Contexts/TodoContext.jsx';
import './TodoFields.css';

export const TodoFields = () => {
  const [texto, setTexto] = useState('');
  const { addTodo } = useTodo();

  const handleAdd = () => {
    if (texto.trim() === '') return;
    addTodo(texto);
    setTexto('');
  };

  return (
    <div className="todo-fields">
      <input 
        type="text" 
        value={texto} 
        onChange={(e) => setTexto(e.target.value)} 
        placeholder="Digite o nome da tarefa principal..."
      />
      <button onClick={handleAdd}>Adicionar Tarefa</button>
    </div>
  );
};