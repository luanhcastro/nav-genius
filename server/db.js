import { Pool } from "pg";
const pool = new Pool({
  host: "db",
  port: "55432",
  user: "root",
  password: "123456",
  database: "nav-genius-db",
});

export default pool;
