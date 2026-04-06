import React, { useState } from 'react';
import './TodoFields.css';

export const TodoFields = ({ onAdd }) => {
  const [texto, setTexto] = useState('');

  const handleAdd = () => {
    if (texto.trim() === '') return;
    onAdd(texto);
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