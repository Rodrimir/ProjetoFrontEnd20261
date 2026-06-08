import seedData from './seedData.json';
const DB_KEY = 'tempoClaro_mockDB';
export const getDB = () => {
  const data = localStorage.getItem(DB_KEY);
  if (!data) {
    localStorage.setItem(DB_KEY, JSON.stringify(seedData));
    return seedData;
  }
  return JSON.parse(data);
};
export const saveDB = (data) => {
  localStorage.setItem(DB_KEY, JSON.stringify(data));
};
export const resetDB = () => {
  localStorage.setItem(DB_KEY, JSON.stringify(seedData));
};
