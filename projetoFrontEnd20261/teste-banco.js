import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',
  database: 'postgres',   
  password: '2206',
  port: 5433,
});

async function testarConexao() {
  try {
    console.log("⏳ Tentando conectar ao PostgreSQL...");
    const res = await pool.query('SELECT current_database() as banco, now() as hora');
    
    console.log("✅ SUCESSO! O banco está respondendo na porta 5433.");
    console.log(`📦 Banco conectado: ${res.rows[0].banco}`);
    
    const resTarefas = await pool.query('SELECT count(*) FROM tarefas');
    console.log(`📋 Total de tarefas encontradas na tabela: ${resTarefas.rows[0].count}`);

  } catch (erro) {
    console.error("❌ ERRO DE CONEXÃO:");
    console.error(erro.message);
  } finally {
    await pool.end();
  }
}

testarConexao();