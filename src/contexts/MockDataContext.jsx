import React, { createContext, useContext, useState, useEffect } from 'react';
import { getDB, saveDB } from '../mocks/db';
const MockDataContext = createContext();
export const MockDataProvider = ({ children }) => {
  const [db, setDb] = useState({ habits: [], stats: [] });
  const [activeHabitId, setActiveHabitId] = useState(null);
  useEffect(() => {
    setDb(getDB());
  }, []);
  const refreshData = () => {
    setDb(getDB());
  };
  const updateHabits = (newHabits) => {
    const newDb = { ...db, habits: newHabits };
    setDb(newDb);
    saveDB(newDb);
  };
  const buyShield = (habitId) => {
    const habitIndex = db.habits.findIndex(h => h.id === habitId);
    if (habitIndex > -1 && db.habits[habitIndex].moedas_locais >= 1500) {
      const newHabits = [...db.habits];
      newHabits[habitIndex].moedas_locais -= 1500;
      newHabits[habitIndex].bloqueios_acumulados += 1;
      updateHabits(newHabits);
      return true;
    }
    return false;
  };
  return (
    <MockDataContext.Provider value={{ 
      db, 
      refreshData, 
      updateHabits, 
      buyShield,
      activeHabitId,
      setActiveHabitId 
    }}>
      {children}
    </MockDataContext.Provider>
  );
};
export const useMockData = () => useContext(MockDataContext);
