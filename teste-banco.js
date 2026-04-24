import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',     
  host: 'localhost',
  database: 'postgres',   
  password: '2206',
  port: 5433,
});

async function criarTabelaUsuarios() {
  try {
    console.log("⏳ Conectando ao banco para criar a tabela...");
    
    await pool.query(`
      CREATE TABLE IF NOT EXISTS usuarios (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL
      );
    `);
    
    console.log("✅ SUCESSO! Tabela 'usuarios' criada (ou já existia).");

  } catch (erro) {
    console.error("❌ ERRO AO CRIAR TABELA:");
    console.error(erro.message);
  } finally {
    await pool.end();
  }
}

criarTabelaUsuarios();