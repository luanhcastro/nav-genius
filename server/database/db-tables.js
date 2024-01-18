import pool from './db.js';

const usersTable = `
  CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    coordinates POINT,
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );
`;

export async function createTableUsers() {
  const client = await pool.connect();
  try {
    await client.query(usersTable);
    console.log('Tabela criada com sucesso ou já existente!');
  } catch (error) {
    console.error('Erro ao criar tabela:', error);
  } finally {
    client.release();
  }
}