import { getDB, saveDB } from './db';
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));
const respond = async (data, status = 200) => {
  await delay();
  if (status >= 400) {
    const error = new Error('Mock API Error');
    error.response = { status, data };
    throw error;
  }
  return { data };
};
export const login = async (data) => {
  return respond({ token: 'mock-jwt-token-123', user: { name: 'Usuário Teste' } });
};
export const register = async (data) => {
  return respond({ token: 'mock-jwt-token-123', user: { name: data.nome || 'Novo Usuário' } });
};
export const getDashboard = async () => {
  const db = getDB();
  return respond(db.habits);
};
const generatePostTaskMessage = (streak, tipo) => {
  const level = Math.min(streak, 20);
  if (tipo === 'Triste') return `Que pena! Não desanime, amanhã é outro dia. (Mensagem Nível ${level})`;
  if (tipo === 'Incrível') return `Sensacional! Você superou todas as expectativas! (Mensagem Nível ${level})`;
  return `Parabéns! Tarefa concluída com sucesso. (Mensagem Nível ${level})`;
};

export const submitExecution = async (id, payload) => {
  const db = getDB();
  const habitIndex = db.habits.findIndex(h => h.id === id);
  if (habitIndex === -1) return respond({ message: 'Not found' }, 404);
  const habit = db.habits[habitIndex];
  
  let moedas_ganhas = 0;
  let novo_nivel = habit.nivel_avatar;
  let feedback = '';
  
  if (payload.tipo === 'COMPLETE_PADRAO' || payload.tipo === 'COMPLETE_EXTRA') {
    if (payload.tipo === 'COMPLETE_EXTRA') {
      moedas_ganhas = 150;
      feedback = generatePostTaskMessage(habit.dias_seguidos + 1, 'Incrível') + ' +150 Moedas!';
    } else {
      moedas_ganhas = 100;
      feedback = generatePostTaskMessage(habit.dias_seguidos + 1, 'Feliz') + ' +100 Moedas!';
    }
    habit.moedas_locais += moedas_ganhas;
    habit.dias_seguidos += 1;
    habit.status = 'COMPLETED';
    habit.nivel_avatar = habit.dias_seguidos;
    novo_nivel = habit.nivel_avatar;
  } 
  else if (payload.tipo === 'BLOCK_ACTIVE') {
    if (habit.bloqueios_acumulados > 0) {
      habit.bloqueios_acumulados -= 1;
      feedback = 'Escudo ativado! Sua ofensiva está salva hoje.';
      habit.status = 'COMPLETED'; 
    } else {
      return respond({ message: 'Sem escudos suficientes' }, 400);
    }
  } 
  else if (payload.tipo === 'FAIL_VOLUNTARY' || payload.tipo === 'FAIL_TIMEOUT') {
    habit.dias_seguidos = 0;
    habit.nivel_avatar = 0;
    novo_nivel = 0;
    feedback = generatePostTaskMessage(0, 'Triste');
    habit.status = 'COMPLETED'; 
  }
  
  saveDB(db);
  return respond({
    moedas_ganhas,
    moedas_totais: habit.moedas_locais,
    dias_seguidos: habit.dias_seguidos,
    novo_nivel,
    texto_feedback: feedback
  });
};
export const buyShield = async (id) => {
  const db = getDB();
  const habit = db.habits.find(h => h.id === id);
  if (!habit) return respond({ message: 'Not found' }, 404);
  if (habit.moedas_locais >= 1500) {
    habit.moedas_locais -= 1500;
    habit.bloqueios_acumulados += 1;
    saveDB(db);
    return respond({ success: true, message: 'Escudo comprado!' });
  } else {
    return respond({ message: 'Moedas insuficientes' }, 400);
  }
};
export const updateProfile = async (data) => respond({ success: true });
export const createHabit = async (data) => {
  const db = getDB();
  const activeCount = db.habits.filter(h => h.status !== 'ARCHIVED').length;
  if (activeCount >= 5) {
    return respond({ message: 'Limite de 5 hábitos atingido' }, 422);
  }
  const novoHabito = {
    id: `h_${Date.now()}`,
    titulo: data.titulo || 'Novo Hábito',
    categoria: data.categoria || 'ESTUDAR',
    meta_base: parseInt(data.meta_base) || 1,
    tipo_medida: data.tipo_medida || 'TEMPO',
    modalidade: data.modalidade || 'DIARIA',
    meta_frequencia_diaria: data.meta_frequencia_diaria || 1,
    intervalo_minutos: data.intervalo_minutos || 0,
    gatilho_ancora: data.gatilho_ancora || '',
    horario_agendado: data.horario_agendado || '',
    status: 'PENDING',
    nivel_avatar: 1,
    moedas_locais: 0,
    bloqueios_acumulados: 0,
    dias_seguidos: 0,
    urgente: false
  };
  db.habits.push(novoHabito);
  saveDB(db);
  return respond(novoHabito, 201);
};
export const updateHabit = async (id, data) => respond({ success: true });
export const archiveHabit = async (id) => {
  const db = getDB();
  const habit = db.habits.find(h => h.id === id);
  if (habit) habit.status = 'ARCHIVED';
  saveDB(db);
  return respond({ success: true });
};
export const getWeeklyStats = async () => {
  const db = getDB();
  return respond(db.stats);
};
const generatePreTaskMessage = (streak) => {
  const level = Math.min(streak || 0, 20);
  return `Mensagem de Sabedoria - Nível ${level}. O foco é a chave do sucesso!`;
};

export const getPreTaskPriming = async (id) => {
  const db = getDB();
  const habit = db.habits.find(h => h.id === id);
  const streak = habit ? habit.dias_seguidos : 0;
  return respond({ texto: generatePreTaskMessage(streak) });
};
