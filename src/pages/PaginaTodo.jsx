import React, { useState, useEffect } from 'react';
import { TodoFields } from '../components/TodoFields/TodoFields.jsx';
import { ListTodos } from '../components/ListTodos/ListTodos.jsx';
import './PaginaTodo.css';

export const PaginaTodo = () => {
  const [listTodos, setListTodos] = useState(() => {
    const salvos = localStorage.getItem('minhas_tarefas');
    return salvos ? JSON.parse(salvos) : [];
  });












  useEffect(() => {
    localStorage.setItem('minhas_tarefas', JSON.stringify(listTodos));
  }, [listTodos]);





  const addTodo = (titulo) => {
    const novaTarefa = { id: Date.now(), titulo, passos: [] };
    setListTodos([...listTodos, novaTarefa]);
  };





  const delTodo = (id) => {
    setListTodos(listTodos.filter(t => t.id !== id));
  };





  const addPasso = (todoId, textoPasso) => {


    
    setListTodos(listTodos.map(t => {
      if (t.id === todoId) {
        return { ...t, passos: [...t.passos, { id: Date.now(), texto: textoPasso, done: false }] };
      }
      return t;
    }));
  };

  const togglePasso = (todoId, passoId) => {
    setListTodos(listTodos.map(t => {
      if (t.id === todoId) {
        const passosAtualizados = t.passos.map(p => 
          p.id === passoId ? { ...p, done: !p.done } : p
        );
        return { ...t, passos: passosAtualizados };
      }
      return t;
    }));
  };

  const delPasso = (todoId, passoId) => {
    setListTodos(listTodos.map(t => {
      if (t.id === todoId) {
        return { ...t, passos: t.passos.filter(p => p.id !== passoId) };
      }
      return t;
    }));
  };

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