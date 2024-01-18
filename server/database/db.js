import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'nav-genius-db',
  password: '123456',
  port: 5433,
});

export default pool;
