import React from 'react';
import { Todo } from '../Todo/Todo.jsx';
import { useTodo } from '../../Contexts/TodoContext.jsx';

export const ListTodos = () => {
  const { listTodos } = useTodo();

  return (
    <div className="todo-grid">
      {listTodos.length === 0 && <p style={{color: '#aaa', textAlign: 'center'}}>Nenhuma tarefa por aqui...</p>}
      
      {listTodos.map(todo => (
        <Todo 
          key={todo.id} 
          todo={todo} 
        />
      ))}
    </div>
  );
};