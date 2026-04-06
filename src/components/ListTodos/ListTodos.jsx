import React from 'react';
import { Todo } from '../Todo/Todo.jsx';

export const ListTodos = ({ lista, onAddPasso, onTogglePasso, onDelPasso, onDelTodo }) => {
  return (
    <div className="list-todos-container">
      {lista.length === 0 && <p style={{color: '#aaa', textAlign: 'center'}}>Nenhuma tarefa por aqui...</p>}
      
      {lista.map(todo => (
        <Todo 
          key={todo.id} 
          todo={todo} 
          onAddPasso={onAddPasso}
          onTogglePasso={onTogglePasso}
          onDelPasso={onDelPasso}
          onDelTodo={onDelTodo}
        />
      ))}
    </div>
  );
};