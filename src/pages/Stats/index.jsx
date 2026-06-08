import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Search, Flame, Target } from 'lucide-react';
import { useMockData } from '../../contexts/MockDataContext';
import {
  StatsContainer,
  Title,
  HabitTitle,
  ContentWrapper,
  GridRow,
  StatCard,
  CardHeader,
  CardValue,
  ChartCard,
  ChartTitle,
  ChartWrapper,
  EmptyStateContainer,
  EmptyIconWrapper,
  EmptyTitle,
  EmptyText
} from './styles';

const Stats = () => {
  const { db, activeHabitId } = useMockData();
  const [data, setData] = useState([]);
  const [habit, setHabit] = useState(null);

  useEffect(() => {
    if (activeHabitId && db) {
      const selected = db.habits.find(h => h.id === activeHabitId);
      setHabit(selected);
      
      const isTempo = selected?.tipo_medida === 'TEMPO';
      const meta = selected?.meta_base || 1;
      
      const mockWeeklyData = [
        { name: 'Seg', valor: isTempo ? meta * 0.8 : meta * 1.1 },
        { name: 'Ter', valor: isTempo ? meta * 1.2 : meta * 0.9 },
        { name: 'Qua', valor: meta },
        { name: 'Qui', valor: 0 },
        { name: 'Sex', valor: isTempo ? meta * 1.5 : meta * 0.5 },
        { name: 'Sáb', valor: isTempo ? meta * 0.2 : meta },
        { name: 'Dom', valor: meta }
      ];
      setData(mockWeeklyData);
    } else {
      setHabit(null);
    }
  }, [activeHabitId, db]);

  if (!habit) {
    return (
      <EmptyStateContainer>
        <EmptyIconWrapper>
          <Search size={32} />
        </EmptyIconWrapper>
        <EmptyTitle>Nenhum Hábito em Foco</EmptyTitle>
        <EmptyText>
          Volte para a tela Inicial e posicione um hábito no centro do carrossel para ver seus dados.
        </EmptyText>
      </EmptyStateContainer>
    );
  }

  const isTempo = habit.tipo_medida === 'TEMPO';
  const maxRecord = Math.max(...data.map(d => d.valor));
  
  const formatMedida = (valor) => {
    if (isTempo) return `${Math.round(valor / 60)} min`;
    return `${valor} ${habit.categoria === 'AGUA' ? 'ml' : 'vezes'}`;
  };

  return (
    <StatsContainer>
      <Title>Dados do Hábito</Title>
      <HabitTitle>{habit.titulo}</HabitTitle>

      <ContentWrapper>
        
        <GridRow>
          <StatCard>
            <CardHeader>
              <Flame size={16} color="var(--warning-color)" /> Dias Seguidos
            </CardHeader>
            <CardValue $large>{habit.dias_seguidos}</CardValue>
          </StatCard>
          
          <StatCard>
            <CardHeader>
              <Target size={16} color="var(--primary-color)" /> Recorde da Semana
            </CardHeader>
            <CardValue>{formatMedida(maxRecord)}</CardValue>
          </StatCard>
        </GridRow>

        <ChartCard>
          <ChartTitle>Desempenho (Últimos 7 dias)</ChartTitle>
          <ChartWrapper>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <XAxis dataKey="name" stroke="var(--text-secondary)" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  cursor={{fill: 'var(--primary-light)'}} 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 15px rgba(0,0,0,0.1)', fontWeight: 600 }} 
                  formatter={(value) => [formatMedida(value), 'Realizado']}
                />
                <Bar dataKey="valor" fill="var(--primary-color)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartWrapper>
        </ChartCard>

      </ContentWrapper>
    </StatsContainer>
  );
};

export default Stats;
