import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CardImc } from '../calc/CalcImc.jsx';
import './PaginaCalc.css';

export const PaginaCalc = () => {
  const navegar = useNavigate();

  return (
    <div className="fundo-preto">
      <div className="container">
        <CardImc nm="Pessoa 1" alt={1.6} ps={60} />
        <CardImc nm="Pessoa 2" alt={1.7} ps={75} />
        <CardImc nm="Pessoa 3" alt={1.8} ps={100} />
      </div>
      <button className="next" onClick={() => navegar('/todo')}>
        Todo List ➔
      </button>
    </div>
  );
};