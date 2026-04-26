import React, { createContext, useContext, useState, useEffect } from 'react';

const TodoContext = createContext();

const STORAGE_KEY = 'minhas_tarefas';

// eslint-disable-next-line react-refresh/only-export-components
export const useTodo = () => {
  return useContext(TodoContext);
};

export const TodoProvider = ({ children }) => {
  const [listTodos, setListTodos] = useState(() => {
    const salvos = localStorage.getItem(STORAGE_KEY);
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(listTodos));
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