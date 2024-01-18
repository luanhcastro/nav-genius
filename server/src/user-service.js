import pool from '../database/db.js';

class UserService {
  static async getAllUsers() {
    const result = await pool.query('SELECT * FROM users');
    return result.rows;
  }

  static async getUserById(id) {
    const result = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    return result.rows[0];
  }

  static async getUserByEmail(email) {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    return result.rows[0];
  }

  static async createUser(name, email, phone, coordinates) {
    const pointString = `(${coordinates.x},${coordinates.y})`;

    const result = await pool.query(
      'INSERT INTO users (name, email, phone, coordinates) VALUES ($1, $2, $3, $4::point) RETURNING *',
      [name, email, phone, pointString]
    );

    return result.rows[0];
  }

  static async updateUser(id, name, email, phone, coordinates) {
    const result = await pool.query(
      'UPDATE users SET name = $1, email = $2, phone = $3, coordinates = $4 WHERE id = $5 RETURNING *',
      [name, email, phone, coordinates, id]
    );
    return result.rows[0];
  }

  static async deleteUser(id) {
    const result = await pool.query('DELETE FROM users WHERE id = $1 RETURNING *', [id]);
    return result.rows[0];
  }
}

export default UserService;
