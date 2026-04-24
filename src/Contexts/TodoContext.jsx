import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

export const useTodo = () => {
  const context = useContext(TodoContext);
  if (!context) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
};

export const TodoProvider = ({ children }) => {
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
        const passosAtualizados = t.passos.map(p => p.id === passoId ? { ...p, done: !p.done } : p);
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
    <TodoContext.Provider value={{ listTodos, addTodo, delTodo, addPasso, togglePasso, delPasso }}>
      {children}
    </TodoContext.Provider>
  );
};