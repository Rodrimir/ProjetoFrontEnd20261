import React from 'react';
import { TodoFields } from '../components/TodoFields/TodoFields.jsx';
import { ListTodos } from '../components/ListTodos/ListTodos.jsx';
import { TodoProvider, useTodo } from '../Contexts/TodoContext.jsx';
import './PaginaTodo.css';

const PaginaTodoContent = () => {
  const { listTodos, addTodo, delTodo, addPasso, togglePasso, delPasso } = useTodo();

  return (
    <div className="fundo-preto">
      <div className="container-todo-page">
        <h1 style={{ color: '#86efac', marginBottom: '20px', textAlign: 'center' }}>
          Atividade 2: Todo List
        </h1>
        
        <TodoFields onAdd={addTodo} />
        
        <ListTodos 
          lista={listTodos}
          onAddPasso={addPasso}
          onTogglePasso={togglePasso}
          onDelPasso={delPasso}
          onDelTodo={delTodo}
        />
      </div>
    </div>
  );
};

export const PaginaTodo = () => {
  return (
    <TodoProvider>
      <PaginaTodoContent />
    </TodoProvider>
  );
};