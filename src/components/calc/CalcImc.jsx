import React, { useState, useEffect } from 'react';
import './CalcImc.css';

export const CardImc = ({ nm, alt, ps }) => {
    const [peso, setPeso] = useState(ps);
    const [color, setColor] = useState('');
    const calc = peso / (alt * alt);
    const final = calc.toFixed(2);
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (calc <= 24.5) {
      setColor('#86efac'); 
    } else if (calc > 24.5 && calc < 30) {
      setColor('#f7b500'); 
    } else {
      setColor('#af3925'); 
    }
  }, [calc]); 

  return (
    <div className="card" style={{ backgroundColor: color }}>
      <h2>{nm}:</h2>
      <p>Altura: {alt} m</p>
      <div className="peso">
        <p>Peso: {peso} kg</p>
        <div className="botoes-peso">
          <button onClick={() => setPeso(p => p + 1)}>+</button>
          <button onClick={() => setPeso(p => p - 1)}>-</button>
        </div>
      </div>
      <p>IMC: {final}</p>
    </div>
  );
};