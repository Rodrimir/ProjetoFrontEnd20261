import React from 'react';
import { TodoFields } from '../components/TodoFields/TodoFields.jsx';
import { ListTodos } from '../components/ListTodos/ListTodos.jsx';
import './PaginaTodo.css';

export const PaginaTodo = () => {
  return (
    <div className="container-todo-page">
      <h1 className="todo-page-title">
        Minhas Tarefas
      </h1>
      
      <div className="todo-fields-wrapper">
        <TodoFields />
      </div>
      
      <ListTodos />
    </div>
  );
};